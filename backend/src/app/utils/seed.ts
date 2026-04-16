import chalk from "chalk";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { auth } from "../lib/auth";
import { envVars } from "../config/env";

export const seedSuperAdmin = async () => {
    try {
        const isSuperAdminExist = await prisma.user.findFirst({
            where: {
                role: Role.SUPER_ADMIN,
            },
        });

        if (isSuperAdminExist) {
            console.log(chalk.red("Super Admin already exist.....!"));
            return;
        }

        const superAdminUser = await auth.api.signUpEmail({
            body: {
                email: envVars.SUPER_ADMIN_EMAIL,
                password: envVars.SUPER_ADMIN_PASSWORD,
                name: "Super Admin",
                role: Role.SUPER_ADMIN,
                needPasswordChange: false,
                rememberMe: false,
            },
        });

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    id: superAdminUser.user.id,
                },
                data: {
                    emailVerified: true,
                },
            });

            await tx.admin.create({
                data: {
                    userId: superAdminUser.user.id,
                    name: "Super Admin",
                    email: envVars.SUPER_ADMIN_EMAIL,
                },
            });
        });

        const superAdmin = await prisma.admin.findFirst({
            where: {
                email: envVars.SUPER_ADMIN_EMAIL,
            },
            include: {
                user: true,
            },
        });

        console.log(chalk.green("Super Admin Created.....!"));
    } catch (error: any) {
        await prisma.user.delete({
            where: {
                email: envVars.SUPER_ADMIN_EMAIL,
            },
        });
        console.error("Error seeding super admin: ", error);
    }
};
