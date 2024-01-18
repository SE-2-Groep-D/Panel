import {useAuth} from "@hooks";

const Role = {
    Beheerder: 'BEHEERDER',
    Medewerker: 'MEDEWERKER',
    Ervaringsdeskundige: 'ERVARINGSDESKUNDIGE',
    Bedrijf: 'BEDRIJF',
    Gebruiker: 'GEBRUIKER',
}


function isRole(role) {
    if(role.toUpperCase() === Role.Gebruiker) return true;
    const {userInfo} = useAuth();

    if(userInfo == null || userInfo.userType == null) return false;
    for (let roleKey in Role) {
        if(!role.toUpperCase() === roleKey) continue;
        return true;
    }

    return false;
}


function hasPermission(requiredRole) {
    const { userInfo } = useAuth();

    if (userInfo == null || userInfo.userType == null) return false;

    const roleHierarchy = {
        Beheerder: [Role.Medewerker],
        Medewerker: [Role.Bedrijf, Role.Ervaringsdeskundige],
        Bedrijf: [Role.Gebruiker],
        Ervaringsdeskundige: [Role.Gebruiker],
        Gebruiker: [],
    };

    const userRoles = roleHierarchy[userInfo.userType];
    return userRoles.includes(requiredRole.toUpperCase()) || userInfo.userType.toUpperCase() === requiredRole.toUpperCase();
}

export {Role, isRole, hasPermission}