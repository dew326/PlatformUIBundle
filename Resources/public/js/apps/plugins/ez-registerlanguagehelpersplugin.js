/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-registerlanguagehelpersplugin', function (Y) {
    "use strict";
    /**
     * Provides the register language helpers plugin
     *
     * @module ez-registerhelpersplugin
     */
    Y.namespace('eZ.Plugin');

    /**
     * Register Language Helpers plugin for the Platform UI application. It registers
     * handlebars helper allowing to get language name based on language code:
     *
     *   * `language_name` is for returning language name based on given language code. It takes the
     *   language code as an argument
     *
     * @namespace eZ.Plugin
     * @class RegisterLanguageHelpers
     * @constructor
     * @extends Plugin.Base
     */
    Y.eZ.Plugin.RegisterLanguageHelpers = Y.Base.create('registerLanguageHelpersPlugin', Y.Plugin.Base, [], {
        initializer: function () {
            this._registerLanguageName();
        },

        /**
         * Registers the `language_name` handlebars helper. The `language_name` helper expects the
         * argument to be a language code. It will return language name from the language object
         * in app's systemLanguageList. If language with given language code won't be found in
         * systemLanguageList then language code is returned.
         *
         * @method _registerLanguageName
         * @protected
         */
        _registerLanguageName: function () {
            var app = this.get('host');

            Y.Handlebars.registerHelper('language_name', Y.bind(app.getLanguageName, app));
        },
    }, {
        NS: 'registerLanguageHelpers',
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZ.Plugin.RegisterLanguageHelpers, ['platformuiApp']
    );
});
