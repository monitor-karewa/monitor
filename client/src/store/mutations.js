export default {
    currentOrganizationId(state, currentOrganizationId) {
        state.currentOrganization._id = currentOrganizationId;
    },
    currentOrganizationName(state, currentOrganizationName) {
        state.currentOrganization.name = currentOrganizationName;
    },
    currentOrganizationShortName(state, currentOrganizationShortName) {
        state.currentOrganization.shortName = currentOrganizationShortName;
    },
    currentOrganizationColor(state, currentOrganizationColor) {
        state.currentOrganization.color = currentOrganizationColor;
    },
    currentOrganizationTheme(state, currentOrganizationTheme) {
        state.currentOrganization.theme = currentOrganizationTheme;
    }
}