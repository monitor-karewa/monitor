export default {
    CURRENT_USER(state, {fullName}) {
        state.currentUser.fullName = fullName;
    },
    
    CURRENT_ORGANIZATION(state, {_id, name, shortName, color, theme, cover, title, description, contactLocation, contactEmail}) {
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
        if (theme) {
            state.currentOrganization.theme = theme;
        }
        if (cover) {
            state.currentOrganization.cover = cover;
        }
        state.currentOrganization.title = title;
        // if (title) {
        // }
        state.currentOrganization.description = description;
        // if (description) {
        // }
        // state.currentOrganization.contactLocation = contactLocation;
        // if (contactLocation) {
        // }
        // state.currentOrganization.contactEmail = contactEmail;
        // if (contactEmail) {
        // }
    }
}