import z from "zod";

export const updateSpecialtySchema = z
    .object({
        title: z
            .string({ message: "Specialty name must be a string" })
            .min(2, { message: "Specialty name must be at least 2 characters" })
            .optional(),
        description: z
            .string({ message: "Description must be a string" })
            .min(5, {
                message: "Description must be at least 5 characters long",
            })
            .optional(),
        icon: z
            .url({ message: "Icon must be a valid URL" })
            .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided to update",
    });
