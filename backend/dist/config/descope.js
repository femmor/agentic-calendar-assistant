import DescopeClient from "@descope/node-sdk";
const projectId = process.env.DESCOPE_PROJECT_ID;
if (!projectId) {
    throw new Error("DESCOPE_PROJECT_ID is not defined in the environment variables.");
}
const managementKey = process.env.DESCOPE_MANAGEMENT_KEY;
if (!managementKey) {
    throw new Error("DESCOPE_MANAGEMENT_KEY is not defined in the environment variables.");
}
export const descopeClient = DescopeClient({
    projectId: projectId ?? "",
    managementKey: managementKey ?? "",
});
