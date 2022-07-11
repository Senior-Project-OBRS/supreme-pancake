import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

if (Meteor.isServer) {
    const facebookSettings = Meteor.settings.packages["service-configuration"].facebook;
    const githubSettings = Meteor.settings.packages["service-configuration"].github;
    const googleSettings = Meteor.settings.packages["service-configuration"].google;

    if (facebookSettings) {
        ServiceConfiguration.configurations.upsert(
            { service: "facebook" },
            {
                // Testing
                $set: {
                    loginStyle: facebookSettings.Testing.loginStyle,
                    appId: facebookSettings.Testing.appId,
                    secret: facebookSettings.Testing.secret
                }

                // Production
                // $set: {
                //     loginStyle: facebookCredentials.Production.loginStyle,
                //     appId: facebookCredentials.Production.appId,
                //     secret: facebookCredentials.Production.secret
                // }
            }
        );
    } else if (githubSettings) {
        ServiceConfiguration.configurations.upsert(
            { service: "github" },
            {
                $set: {
                    loginStyle: githubSettings.loginStyle,
                    clientId: githubSettings.appId,
                    secret: githubSettings.secret
                }
            }
        );
    } else if (googleSettings) {
        ServiceConfiguration.configurations.upsert(
            { service: "google" },
            {
                $set: {
                    loginStyle: googleSettings.loginStyle,
                    clientId: googleSettings.clientId,
                    secret: googleSettings.secret
                }
            }
        );
    }
}