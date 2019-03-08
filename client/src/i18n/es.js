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
                "nombre": "Nombre"
                "email": "Email"
                
            ✓ correcto:
                "usuarios.nombre": "Nombre"
                "usuarios.email": "Email"
                
    - Si un segmento tiene más de una palabra, deben separarse con guión (-).
    - No duplicar mensajes para plurales. Se debe usar la pluralización de vue-i18n
        (http://kazupon.github.io/vue-i18n/guide/pluralization.html)

        ej.
            x incorrecto:
                "usuarios.usuario": "Usuario"
                "usuarios.usuarios": "Usuarios"
            
            ✓ correcto:
                "usuarios.usuario": "Usuario | Usuarios"
        
    - No se permiten acentos, así que de preferencia utiliza "hacks" para palabras que no suenen bien:
        ej. año => anio
        
    - Si se usa inglés, por favor verifica que lo que escribas es correcto.
        
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
        
        ej. Si quieres colocar "Email" para usuario.email y ya existe la siguiente internacionalización:
        
                "proveedor.email": "Email"
                
            Es tentador usarla, ¿pero que pasa si en un futuro se cambia el valor de la siguiente manera?
            
                "proveedor.email": "Email del Proveedor"
                
            Este uso es incorrecto, por reutilizar el i18n de una llave existente, pero que no corresponde a la misma propiedad,
            
            Aunque tenga el mismo valor, conceptualmente la i18n puede ser distinta
            
    - Mantén las clasificaciones juntas y ordenadas. Es tentador agregar tus i18ns al final, pero ayuda a mantener el orden de la aplicación.

            x incorrecto:
                usuarios.foo.1
                proveedores.foo
                usuarios.bar
                usuarios.foo.2
                comparar.baz
                usuarios.baz
                proveedores.bar
                usuarios.foo.3
                comparar.foo
                comparar.bar
            
            
            ✓ correcto:
                usuarios.foo.1
                usuarios.foo.2
                usuarios.foo.3
                usuarios.bar
                usuarios.baz
                proveedores.foo
                proveedores.bar
                comparar.foo
                comparar.bar
                comparar.baz


¿Inglés o español?
    Se prefiere español para términos de los procesos y los datos de la plataforma.
        Ej. proveedor, calculo, tipo-rfc
        
    Se prefiere inglés para términos de sistemas.
        Ej. error, info, validations, warning, required
        
    Si tienes dudas, o ambos lenguajes son viables, puedes basarte en un uso similar que ya exista, o confiar en tu corazón.


--------Clasificaciones (procesos)-------
general
usuarios
proveedores
unidades-administrativas
recursos
contratos
calculos
comparar


--------Subclasificaciones (partes de los procesos anteriores)-------
error
success
info
warning
[nombre-de-propiedad]
[nombre-de-accion] (ejemplos: "save", "delete")

    --------- Sub-sub-clasificaciones de [nombre-de-propiedad] ---------

    validations
    status
    [sub-propiedades-de-la-propiedad]



--------Ejemplos-------

"general.app-name": "Monitor Karewa"
"general.copyright": "Black Labs 2019"
"general.error.cargar-registros": "No fue posible cargar los registros. Por favor recarga la página e intenta nuevamente."
"general.info.loading": "Cargando..."

"usuarios.usuario": "Usuario"
"usuarios.email": "Email"
"usuarios.email.description": "El email que utilizará el usuario para acceder a la plataforma."
"usuarios.email.placeholder": "Introduce el email del usuario."
"usuarios.email.validations.required": "El email del Usuario es requerido."
"usuarios.email.validations.invalid": "Por favor introduce un email válido para el Usuario."
"usuarios.email.status": "Estatus del email"
"usuarios.email.status.pendiente-validacion": "Pendiente de validar"
"usuarios.email.status.validado": "Validado"

"proveedores.error.duplicado": "El Proveedor ya se encuentra registrado."
"proveedores.warning.tipo-rfc-inconsistente": "El RFC registrado para este Proveedor corresponde a una persona moral, pero el Proveedor es persona física."
"proveedores.rfc": "RFC del Proveedor"
"proveedores.rfc.validations.required": "El RFC del Proveedor es requerido."

 */

export default {
    "general.hello-world": "Hello world",
    "general.welcome-to": "Bienvenido a",
    "general.app.name": "Monitor Karewa",
    "general.app.description": "Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio de Chihuahua.",
    "general.app.name.html-strong": "Monitor <strong>Karewa</strong>"
}