import { Router } from "express";
import { ragController } from "./rag.controller";

const router = Router();

router.get("/stats", ragController.getStats);

//index doctors data
router.post("/ingest-doctors", ragController.ingestDoctors);

// query rag
router.post("/query", ragController.queryRag);


export const ragRoutes = router;