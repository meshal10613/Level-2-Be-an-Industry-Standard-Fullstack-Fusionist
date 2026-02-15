import { addHours, addMinutes, format } from "date-fns";
import { ICreateSchedulePayload } from "./schedule.interface";
import { convertDateTime } from "./schedule.utils";
import { prisma } from "../../lib/prisma";

const createSchedule = async (payload: ICreateSchedulePayload) => {
    const { startDate, endDate, startTime, endTime } = payload;
    const interval = 30; //? 30 minutes interval

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    const schedule = [];
    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]),
                ),
                Number(startTime.split(":")[1]),
            ),
        );

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0]),
                ),
                Number(endTime.split(":")[1]),
            ),
        );

        while (startDateTime < endDateTime) {
            const s = await convertDateTime(startDateTime);
            const e = await convertDateTime(endDateTime);
            const scheduleData = { startDateTime: s, endDateTime: e };

            const existingSchedule = await prisma.schedule.findFirst({
                where: {
                    startDateTime: scheduleData.startDateTime,
                    endDateTime: scheduleData.endDateTime,
                },
            });

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData,
                });

                schedule.push(result);
            }

            startDateTime.setMinutes(startDateTime.getMinutes() + interval);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedule;
};

const getAllSchedules = async () => {
    const result = await prisma.schedule.findMany();
    return result;
};

const getScheduleById = async (id: string) => {
    const result = await prisma.schedule.findUnique({
        where: { id },
    });
    return result;
};

const updateSchedule = async () => {};

const deleteSchedule = async () => {};

export const scheduleService = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};
