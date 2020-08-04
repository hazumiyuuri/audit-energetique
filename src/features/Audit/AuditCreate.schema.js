import * as Yup from 'yup';

const AuditCreateSchema = Yup.object({
    numero_audit: Yup.string()
        .required('Required'),
    nom: Yup.string()
        .required('Required'),
    prenom: Yup.string()
        .required('Required'),
    telephone: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Email invalide')
        .required('Required'),
    adresse: Yup.string()
        .required('Required'),
    ville: Yup.string()
        .required('Required'),
    code_postale: Yup.string()
        .required('Required'),
    pays: Yup.string()
        .required('Required'),
});

export {
    AuditCreateSchema
}