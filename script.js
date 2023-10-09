//main js file
import { settings } from "./settings.js";

console.log('settings', settings);

/* Login function  */
function login() {
  function isLoggedIn() {
    return fetch("https://" + settings.config.host + "/api/v1/users/me", {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'qlik-web-integration-id': settings.config.webIntegrationId,
      },
    }).then(response => {
      return response.status === 200;
    });
  }

  return isLoggedIn().then(loggedIn => {
    if (!loggedIn) {
      // check login
        window.top.location.href = "https://" + settings.config.host + "/login?qlik-web-integration-id=" + settings.config.webIntegrationId + "&returnto=" + top.location.href;
      throw new Error('not logged in');
    }
  });

}

login().then(() => {

  require.config( {
    baseUrl: ( settings.config.isSecure ? "https://" : "http://" ) + settings.config.host + (settings.config.port ? ":" + settings.config.port : "") + settings.config.prefix + "resources",
    webIntegrationId: settings.config.webIntegrationId
  });

  require( ["js/qlik"], function ( qlik ) {
    qlik.on( "error", function ( error ) {
      $( '#popupText' ).append( error.message + "<br>" );
      $( '#popup' ).fadeIn( 1000 );
    } );
    $( "#closePopup" ).click( function () {
      $( '#popup' ).hide();
    } );
      //open apps -- inserted here --
      var app = qlik.openApp( settings.appId, settings.config );
      //get objects -- inserted here --		
      
      app.getObject("qv1", "BCXMe");
      app.getObject("qv2", "zAsXNT");
  });

});



