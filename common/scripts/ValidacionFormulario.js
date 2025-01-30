// Script de Validacion del Formulario de Contactenos

// Elements
const nombresTxt = document.querySelector( '#txtNamesId' );
const apellidosTxt = document.querySelector( '#txtLastNamesId' );
const telefonoTxt = document.querySelector( '#txtPhoneId' );
const correoTxt = document.querySelector( '#txtEmailId' );
const motivoTxt = document.querySelector( '#txtMotivoId' );
const aceptacionCheck = document.querySelector( '#chkAcceptanceId' );
const ciudadSelectCmb = document.querySelector( '#cmbCitiesId' );
const submitButton = document.querySelector( '#submitButtonId' );

submitButton.addEventListener( 'click', function( event ) {
    // Evitando el Envio de Información y actualización de la página para validar los campos primero
    event.preventDefault();

    // Reusable Constant values
    const errorVisibleDisplay = "flex";
    const hiddenDisplay = "none";

    // Variable Verifier
    let isValid = true;
    
    // Validation Cases
    if ( nombresTxt.value.trim() === '' ) 
    {
        document.querySelector( '#namesTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } 
    else 
    {
        document.querySelector( '#namesTooltipId' ).style.display = hiddenDisplay;
    }

    if ( apellidosTxt.value.trim() === '' ) 
    {
        document.querySelector( '#lastNamesTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } 
    else 
    {
        document.querySelector( '#lastNamesTooltipId' ).style.display = hiddenDisplay;
    }

    if ( telefonoTxt.value.trim() === '' ) 
    {
        document.querySelector( '#phoneTooltipMsgId' ).innerHTML = 'Se requiere que llene el campo con su número telefónico para poder contactarlo/a';
        document.querySelector( '#phoneTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    }
    else if ( telefonoTxt.validity.patternMismatch ) 
    {
        document.querySelector( '#phoneTooltipMsgId' ).innerHTML = 'Se requiere que ingrese el teléfono con el formato adecuado: solo números';
        document.querySelector( '#phoneTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } 
    else 
    {
        document.querySelector( '#phoneTooltipId' ).style.display = hiddenDisplay;
    }

    if ( correoTxt.value.trim() === '' ) 
    {
        document.querySelector( '#emailTooltipMsgId' ).innerHTML = 'Se requiere que llene el campo con su e-mail para poder contactarlo/a';
        document.querySelector( '#emailTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } 
    else if ( correoTxt.validity.patternMismatch ) 
    {
        document.querySelector( '#emailTooltipMsgId' ).innerHTML = 'Se requiere que ingrese la dirección de correo con el formato adecuado: debe tener un @ y una extensión de dominio al final';
        document.querySelector( '#emailTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } 
    else
    {
        document.querySelector( '#emailTooltipId' ).style.display = hiddenDisplay;
    }

    if ( motivoTxt.value.trim() === '' ) {
        document.querySelector( '#motivoTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } else {
        document.querySelector( '#motivoTooltipId' ).style.display = hiddenDisplay;
    }

    if ( !aceptacionCheck.validity.valid ) {
        document.querySelector( '#acceptanceTooltipId' ).style.display = errorVisibleDisplay;
        isValid = false;
    } else {
        document.querySelector( '#acceptanceTooltipId' ).style.display = hiddenDisplay;
    }

    if ( isValid ) {
        alert( "Información enviada exitosamente!" );
        disableFormElements();
        setResultSentData();
        document.querySelector( '.ResultadoClass' ).style.visibility = 'visible';
        event.target.submit();
    }
});

function disableFormElements() {
    nombresTxt.disabled = true;
    apellidosTxt.disabled = true;
    telefonoTxt.disabled = true;
    correoTxt.disabled = true;
    motivoTxt.disabled = true;
    ciudadSelectCmb.disabled = true;
    aceptacionCheck.disabled = true;
    submitButton.disabled = true;
}

function setResultSentData() {
    document.querySelector( '#sentNamesId' ).innerHTML = nombresTxt.value.trim();
    document.querySelector( '#sentLastNamesId' ).innerHTML = apellidosTxt.value.trim();
    document.querySelector( '#sentPhoneId' ).innerHTML = telefonoTxt.value.trim();
    document.querySelector( '#sentEmailId' ).innerHTML = correoTxt.value.trim();
    document.querySelector( '#sentMotivoId' ).innerHTML = motivoTxt.value.trim();
    document.querySelector( '#sentCiudadId' ).innerHTML = ciudadSelectCmb.options[ciudadSelectCmb.selectedIndex].text;
    document.querySelector( '#numeroSolicitudId' ).innerHTML = generarNumeroSolicitud();
}

function generarNumeroSolicitud() {
    numeroSolicitud = 'SOL#';

    for ( let i = 0; i < 7; i++ )
        numeroSolicitud += Math.floor( Math.random() * 10 );

    return numeroSolicitud;
}
