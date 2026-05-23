import axios from "axios";
import { env } from "@/lib/env";

const publicApiClient = axios.create({
  baseURL: env.BACKEND_URL,
});

export default publicApiClient;
