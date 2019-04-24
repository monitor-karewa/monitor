/*

--------------Guía de contribución al i18n---------------

La estructura general es simple:

{{clasificación}}.{{sub-clasificación}}[.{{llave-del-mensaje}}][.{{llave-del-mensaje}}]


Reglas generales:
    - No se permiten mayúsculas.
    - Todos los segmentos de la llave se separan con punto (.)
    - No se permiten mensajes sin clasificación

        ej.
            x incorrecto:
                "name": "Name"
                "email": "Email"

            ✓ correcto:
                "users.name": "Name"
                "users.email": "Email"

    - Si un segmento tiene más de una palabra, deben separarse con guión (-).
    - No duplicar mensajes para plurales. Se debe usar la pluralización de vue-i18n
        (http://kazupon.github.io/vue-i18n/guide/pluralization.html)

        ej.
            x incorrecto:
                "users.user": "User"
                "users.users": "Users"

            ✓ correcto:
                "users.user": "User | Users"

    - No se permiten acentos, así que de preferencia utiliza "hacks" para palabras que no suenen bien:
        ej. año => anio

    - Como se usa inglés, por favor verifica que lo que escribas es correcto.

        ej.
            x incorrecto:
                clasification
            ✓ correcto:
                classification (doble 's')

            x incorrecto:
                wizzard
            ✓ correcto:
                wizard (una sola 'z')

    - Si ya existe una internacionalización que corresponde a lo que deseas usar, verifica que tenga sentido reutilizarla.

        ej. Si quieres colocar "Email" para user.email y ya existe la siguiente internacionalización:

                "supplier.email": "Email"

            Es tentador usarla, ¿pero que pasa si en un futuro se cambia el valor de la siguiente manera?

                "supplier.email": "Email del Supplier"

            Este uso es incorrecto, por reutilizar el i18n de una llave existente, pero que no corresponde a la misma propiedad,

            Aunque tenga el mismo valor, conceptualmente la i18n puede ser distinta

    - Mantén las clasificaciones juntas y ordenadas. Es tentador agregar tus i18ns al final, pero ayuda a mantener el orden de la aplicación.

            x incorrecto:
                users.foo.1
                suppliers.foo
                users.bar
                users.foo.2
                comparations.baz
                users.baz
                suppliers.bar
                users.foo.3
                comparations.foo
                comparations.bar


            ✓ correcto:
                users.foo.1
                users.foo.2
                users.foo.3
                users.bar
                users.baz
                suppliers.foo
                suppliers.bar
                comparations.foo
                comparations.bar
                comparations.baz


¿Inglés o español?
    Siempre en inglés, salvo por términos que no tiene sentido traducir, o que pierden completamente el significado al ser traducidos.

        Ej.
            x incorrecto:
                fcr (iniciales de Federal Contributor Registry)

            ✓ correcto:
                rfc (iniciales de Registro Federal de Contribuyentes)

 Se prefiere inglés para términos de sistemas.
        Ej. error, info, validations, warning, required

    Si tienes dudas, o ambos lenguajes son viables, puedes basarte en un uso similar que ya exista, o confiar en tu corazón.


--------Clasificaciones (procesos)-------
general
users
suppliers
administrative-units
resources
contracts
calculations
comparations


--------Subclasificaciones (partes de los procesos anteriores)-------
error
success
info
warning
[name-de-propiedad]
[name-de-accion] (ejemplos: "save", "delete")

    --------- Sub-sub-clasificaciones de [name-de-propiedad] ---------

    validations
    status
    [sub-propiedades-de-la-propiedad]



--------Ejemplos-------

"general.app-name": "Monitor Karewa"
"general.copyright": "Black Labs 2019"
"general.error.load-docs": "No fue posible cargar los registros. Por favor recarga la página e intenta nuevamente."
"general.info.loading": "Cargando..."

"users.user": "User"
"users.email": "Email"
"users.email.description": "El email que utilizará el user para acceder a la plataforma."
"users.email.placeholder": "Introduce el email del user."
"users.email.validations.required": "El email del User es requerido."
"users.email.validations.invalid": "Por favor introduce un email válido para el User."
"users.email.status": "Estatus del email"
"users.email.status.pendiente-validacion": "Pendiente de validar"
"users.email.status.validado": "Validado"

"suppliers.error.duplicated": "El Supplier ya se encuentra registrado."
"suppliers.warning.inconsistent-rfc": "El RFC registrado para este Supplier corresponde a una persona moral, pero el Supplier es persona física."
"suppliers.rfc": "RFC del Supplier"
"suppliers.rfc.validations.required": "El RFC del Supplier es requerido."

 */

export default {
    "general.hello-world": "Hello world",
    "general.welcome-to": "Bienvenido a",
    "general.app.name": "Monitor Karewa",
    "general.app.description": "Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio de Chihuahua.",
    "general.app.name.html-strong": "Monitor <strong>Karewa</strong>",
    "general.back": "Atrás",
    "general.created-at": "Fecha de creación",
    "general.modal-editable-table.title":"Guardar Registros",
    "general.modal-editable-table.message":"Se modificaran {docsUpdatedLength} registros",
    "general.modal-editable-table.confirmation-question":"¿Estás seguro de guardar los registros modificados?",
    "general.modal-editable-table.cancel-button":"CANCELAR",
    "general.modal-editable-table.ok-button":"GUARDAR",
    "general.card-uploading.loading":"Cargando...",
    "general.card-uploading.might-take-a-while":"Esto proceso puede demorar unos minutos…",

    "calculations.calculation": "Cálculo| Cálculos",


    //Suppliers
    "suppliers.supplier": "Proveedor | Proveedores",
    "suppliers.new.name.label": "Nombre o razón social",
    "suppliers.new.name.sub-label": "A contninuación escribe el nombre o la razón social del proveedor",
    "suppliers.new.name.placeholder": "Introduce el nombre o razón social",
    "suppliers.new.rfc.label": "RFC",
    "suppliers.new.rfc.sub-label": "El RFC del proveedor",
    "suppliers.new.rfc.placeholder": "Introduce el RFC",
    "suppliers.new.notes.label": "Notas adicionales",
    "suppliers.new.notes.sub-label": "Aquí puedes agregar notas adicionales al registro del proveedor",
    "suppliers.new.notes.placeholder": "Introduce notas adicionales",
    "suppliers.name": "Nombre o razón social",
    "suppliers.rfc": "RFC",
    "suppliers.notes": "Notas",


    //Organizations
    "organizations.organization": "Organización | Organizaciones",
    "organizations.name" : "Nombre",
    "organizations.validation.required":"El campo {field} de la Organización es requerido",
    "organizations.validation.max.name":"El nombre excede los {maxLength} caracteres permitidos",

    //Adminsitrative Units
    "administrativeUnits.administrativeUnit": "Unidad administrativa | Unidades administrativas",
    "administrativeUnits.name" : "Nombre",
    "administrativeUnits.notes" : "Notas Adicionales",

    "administrativeUnits.new.name.label": "Nombre",
    "administrativeUnits.new.name.sub-label": "A continuación escribe el nombre de la Unidad Administrativa",
    "administrativeUnits.new.name.placeholder": "Introduce el nombre",
    "administrativeUnits.new.notes.label": "Notas Adicionales",
    "administrativeUnits.new.notes.sub-label": "Aquí puedes escribir notas sobre el usuario",
    "administrativeUnits.new.notes.placeholder": "Introduce las notas adicionales",
    "administrativeUnits.validation.required": "El campo {field} de la U. Administrativa es requerido",


    //Users
    "users.user": "Usuario | Usuarios",
    "users.validation.required":"El campo {field} del Usuario es requerido",
    "users.validation.email":"El correo electronico introducido no tiene un formato válido",
    "users.validation.min.password":"La contraseña debe tener mínimo {minLength} caracteres",
    "users.name" : "Nombre",
    "users.lastName" : "Apellido",
    "users.email" : "Correo Electrónico",
    "users.new.name.label": "Nombre",
    "users.new.name.sub-label": "A continuación escribe el nombre o la razón social del usuario",
    "users.new.name.placeholder": "Introduce el nombre",
    "users.new.last-name.label": "Apellido",
    "users.new.last-name.sub-label": "A continuación escribe el apellido del usuario",
    "users.new.last-name.placeholder": "Introduce el apellido",
    "users.new.email.label": "Correo electrónico",
    "users.new.email.sub-label": "El email del Usuario",
    "users.new.email.placeholder": "Introduce el email del Usuario",
    "users.new.enabled.label": "Habilitado",
    "users.new.enabled.checkbox-label": "Habilitar acceso a la plataforma",
    "users.new.admin-type.label": "Tipo de administrador",
    "users.new.admin-type.sub-label": "Al seleccionar General se tendrá acceso total a la plataforma",
    "users.new.admin-type.radio-button.general": "General",
    "users.new.admin-type.radio-button.custom": "Personalizado",
    "users.new.notes.label": "Notas Adicionales",
    "users.new.notes.sub-label": "Aquí puedes escribir notas sobre el usuario",
    "users.new.notes.placeholder": "Introduce las notas adicionales",

    "users.new.admin-type.radio-button.custom.users": "Usuarios",
    "users.new.admin-type.radio-button.custom.suppliers": "Proveedores",
    "users.new.admin-type.radio-button.custom.administrative-units": "Unidades Administrativas",
    "users.new.admin-type.radio-button.custom.contracts": "Contratos",
    "users.new.admin-type.radio-button.custom.calculations": "Cálculos",
    "users.new.admin-type.radio-button.custom.settings": "Configuración",


    //Contracts
    "contracts.contract": "Contrato | Contatos",
    "contracts.supplier" : "Proveedor",
    "contracts.administrativeUnit" : "Unidad Administrativa",
    "contracts.amount" : "Cantidad",
    "contracts.procedureType" : "Tipo de Proceidimiento",
    "contracts.validation.required": "El campo {field} del Contrato es requerido",

    //Resources
    "resources.resource": "Recurso | Recursos",
    "resources.title": "Título",
    "resources.classification": "Casificación",
    "resources.url": "URL",
    "resources.validation.required":"El campo {field} del Recurso es requerido",
    "resources.validation.url":"La Url no tiene el formato correcto",
    "resources.validation.classification":"El valor para la Clasificación del Recurso no es válido",


    //Calculations

    "calculations.name" : "Nombre",
    "calculations.type" : "Tipo",
    "calculations.description" : "Descripción",
    "calculations.enabled" : "Habilitado",
    "calculations.notes" : "Notas",
    "calculation.new.calculation-type.label": "Tipo de cálculo",
    "calculation.new.calculation-type.sub-label": "Selecciona el tipo de Cálculo",
    "calculation.new.calculation-type.radio-button.general": "General",
    "calculation.new.calculation-type.radio-button.contract": "Contrato",
    "calculation.validation.required":"El campo {field} del Cálculo es requerido",
    "resources.validation.classification":"El valor para la Clasificación del Recurso no es válido",
    
    //DataLoad
    "data-load.title-strong": "Carga de <strong>Datos</strong>",
    "data-load.title.description": "Puedes cargar una plantilla de excel o realizar una carga manual para cada dato.",
    "data-load.data-load": "Carga Rápida",
    "data-load.data-load.recommended-for": "Recomendada para 20 o más registros",
    "data-load.manual-capture": "Carga Manual",
    "data-load.manual-capture.recommended-for": "Recomendada para 1 o 20 registros",
    "data-load.manual-capture.go-to-catalog": "Ir al catálogo",
    "data-load.upload-file": "Cargar archivo",
    "data-load.download-template": "Descargar la plantilla",
    "data-load.download-template.link": "Descarga la plantilla aquí",
    "data-load.error.upload.check-in-progress": "Ocurrió un error inesperado al verificar que no exista una carga de datos. Por favor intenta de nuevo más tarde.",
    "data-load.error.upload.data-load-in-progress": "Ya existe una carga de datos en progreso. Por favor continúa o cancela esa carga antes de cargar otro archivo.",
    "data-load.cancel.error.no-data-load-in-progress": "La carga de datos no se encuentra disponible. Por favor recarga la página para actualizar la información.",
    "data-load.cancel.error.unexpected": "Ocurrió un error inesperado al intentar cancelar la carga de datos. Por favor intenta de nuevo más tarde.",
    "data-load.cancel.success": "Se ha cancelado la carga de datos correctamente.",

}