export default {
    CURRENT_ORGANIZATION(state, {_id, name, shortName, color, theme}) {
        if (_id) {
            state.currentOrganization._id = _id;
        }
        if (name) {
            state.currentOrganization.name = name;
        }
        if (shortName) {
            state.currentOrganization.shortName = shortName;
        }
        if (color) {
            state.currentOrganization.color = color;
        }
        if (color) {
            state.currentOrganization.theme = theme;
        }
    }
}