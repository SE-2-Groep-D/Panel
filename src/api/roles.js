import {useAuth} from "@hooks";

const Role = {
    Beheerder: 'BEHEERDER',
    Medewerker: 'MEDEWERKER',
    Ervaringsdeskundige: 'ERVARINGSDESKUNDIGE',
    Bedrijf: 'BEDRIJF',
    Gebruiker: 'GEBRUIKER',
}


function isRole(role) {
    if(requiredRole.toUpperCase() === Role.Gebruiker) return true;

    const {userInfo} = useAuth();

    if(userInfo == null || userInfo.userType == null) return false;
    for (let roleKey in Role) {
        if(!role.toUpperCase() === roleKey) continue;
        return true;
    }

    return false;
}


function hasPermission(requiredRole) {
    if(requiredRole.toUpperCase() === Role.Gebruiker) return true;

    const { userInfo } = useAuth();
    if (userInfo == null || userInfo.userType == null) return false;
    const roleHierarchy = [Role.Beheerder, Role.Medewerker, Role.Ervaringsdeskundige, Role.Bedrijf];

    const indexOfUser = roleHierarchy.indexOf(userInfo.userType);
    const indexOfRequiredRole = roleHierarchy.indexOf(requiredRole.toUpperCase());

    return indexOfUser !== -1 && indexOfRequiredRole !== -1 && indexOfUser >= indexOfRequiredRole;
}

export {Role, isRole, hasPermission}