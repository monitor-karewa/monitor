let Variable = require('./variablesManager');


let variables = {
  //  Manejo de Contrataciones
  $MTG: Variable.makeVariable({
      name:"Monto total gastado",
      description :"Monto total gastado acorde a los contratos públicos de la organización",
      abbreviation:"$MTG",
      query:{}
  }),
  $MGLP: Variable.makeVariable({
      name:"Monto gastado bajo Licitaciones Públicas",
      description:"Monto gastado en contratos hechos bajo Licitaciones Públicas",
      abbreviation:"$MGLP",
      query:{}
  }),
  $MGAD: Variable.makeVariable({
      name:"Monto gastado bajo Adjudicación Directa",
      description:"Monto gastado en contratos hechos bajo Adjudicación Directa",
      abbreviation:"$MGAD",
      query:{}
  }),
  $MGIR: Variable.makeVariable({
      name:"Monto gastado bajo Invitaciones Restringidas",
      description:"Monto gastado en contratos hechos bajo Invitaciones Restringidas",
      abbreviation:"$MGIR",
      query:{}
  }),
  $NTC: Variable.makeVariable({
      name:"Número total de contratos",
      description:"Número total de contratos públicos de la organización",
      abbreviation:"$NTC",
      query:{}
  }),
  $NCSF: Variable.makeVariable({
      name:"Número de contratos sin No. de Folio",
      description:"Número de contratos públicos de la organización que no cuentan con un número de folio",
      abbreviation:"$NCSF",
      query:{}
  }),
  $MADEM: Variable.makeVariable({
      name:"Monto de adjudicaciones directas que sobrepasan el monto máximo aprobado",
      description:"Monto de adjudicaciones directas que sobrepasan el monto máximo aprobado",
      abbreviation:"$MADEM",
      query:{}
  }),
  $MTAD: Variable.makeVariable({
      name:"Monto total de adjudicaciones directas",
      description:"Monto total de los contratos hechos bajo adjudicaciones directas",
      abbreviation:"$MTAD",
      query:{}
  }),

  // Competencia Económica
  $NTP: Variable.makeVariable({
      name:"Número total de proveedores",
      description:"Número total de proveedores registrados por la organización",
      abbreviation:"$NTP",
      query:{}
  }),
  $NPEPE: Variable.makeVariable({
      name:"Número de proveedores por encima del promedio ejercido",
      description:"Número de proveedores que se encuentran por encima del promedio ejercido",
      abbreviation:"$NPEPE",
      query:{}
  }),
  $NP80E: Variable.makeVariable({
      name:"Número de proveedores que concentran el 80% del gasto ejercido",
      description:"Número de proveedores que concentran el 80% del gasto ejercido",
      abbreviation:"$NP80E",
      query:{}
  }),
  $NPEPCP: Variable.makeVariable({
      name:"Número de proveedores por encima del promedio de contratos por proveedor",
      abbreviation:"$NPEPCP",
      query:{}
  }),

  // Transparencia
  $NCDPT: Variable.makeVariable({
      name:"Número de contratos disponibles en el Portal de Transparencia",
      abbreviation:"$NCDPT",
      query:{}
  }),
  $NIDPT: Variable.makeVariable({
      name:"Número de convocatorias o invitaciones disponibles en el Portal de Transparencia",
      abbreviation:"$NIDPT",
      query:{}
  }),
  $NCPJA: Variable.makeVariable({
      name:"Número de contratos de los que fueron publicadas las juntas de aclaraciones",
      abbreviation:"$NCPJA",
      query:{}
  }),
  $NFXXVII: Variable.makeVariable({
      name:"Número de formatos XXVIII publicados a tiempo en el Portal de Transparencia",
      abbreviation:"$NFXXVII",
      query:{}
  })
};

module.exports.variables = variables;