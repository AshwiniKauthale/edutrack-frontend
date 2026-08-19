import axios from "axios";
import { getAuthHeaders } from "../utils/Auth";

const API_URL = "http://localhost:8080";

// =====================================================
// GET ALL BATCHES
// =====================================================

export const getBatches = async () => {

    const response = await axios.get(
        `${API_URL}/batches`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// GET SINGLE BATCH
// =====================================================

export const getBatchById = async (id) => {

    const response = await axios.get(
        `${API_URL}/batches/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// CREATE BATCH
// =====================================================

export const createBatch = async (batchData) => {

    const response = await axios.post(
        `${API_URL}/batches`,
        batchData,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// UPDATE BATCH
// =====================================================

export const updateBatch = async (id, batchData) => {

    const response = await axios.put(
        `${API_URL}/batches/${id}`,
        batchData,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// DELETE BATCH
// =====================================================

export const deleteBatch = async (id) => {

    const response = await axios.delete(
        `${API_URL}/batches/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};