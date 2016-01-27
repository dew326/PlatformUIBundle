/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ez-trashview', function (Y) {
    "use strict";
    /**
     * Provides the Trash View class
     *
     * @module ez-trashview
     */
    Y.namespace('eZ');

    var MINIMIZE_TRASH_BAR_CLASS = 'is-trashbar-minimized';

    /**
     * The Trash view
     *
     * @namespace eZ
     * @class TrashView
     * @constructor
     * @extends eZ.TemplateBasedView
     */
    Y.eZ.TrashView = Y.Base.create('trashView', Y.eZ.TemplateBasedView, [], {
        initializer: function () {
            this.on('*:minimizeTrashBarAction', this._handleMinimizeTrashBar);
        },

        /**
         * Event handler for the minimizeTrashBarAction event
         *
         * @protected
         * @method _handleMinimizeTrashBar
         */
        _handleMinimizeTrashBar: function () {
            this.get('container').toggleClass(MINIMIZE_TRASH_BAR_CLASS);
        },

        /**
        * Renders the trash view
        *
        * @method render
        * @return {eZ.TrashView} the view itself
        */
        render: function () {
            var container = this.get('container');

            container.setHTML(this.template({
                trashItems: this._convertTrashItemsToJSON(),
            }));

            container.one('.ez-trashbar-container').append(
                this.get('trashBar').render().get('container')
            );

            this._uiSetMinHeight();
            return this;
        },

        /**
         * Sets the minimum height of the view
         *
         * @private
         * @method _uiSetMinHeight
         */
        _uiSetMinHeight: function () {
            var container = this.get('container');

            container.one('.ez-trashview-content').setStyle(
                'minHeight', container.get('winHeight') + 'px'
            );
        },

        /**
         * Converts the content of the `trashItems` attribute into JSON
         *
         * @protected
         * @method _convertTrashItemsToJSON
         * @return {Array} of JSONified `trashItems`
         */
        _convertTrashItemsToJSON: function () {
            return Y.Array.map(this.get('trashItems'), function (trashItem) {
                return {
                    'item': trashItem.item.toJSON(),
                    'parentLocation': trashItem.parentLocation.toJSON(),
                    'contentType': trashItem.contentType.toJSON(),
                };
            });
        },

        destructor: function () {
            var bar = this.get('trashBar');

            bar.removeTarget(this);
            bar.destroy();
        }
    }, {
        ATTRS: {

            /**
             * List of Trash Items struct:
             *  - struct.item: Y.eZ.TrashItem
             *  - struct.parentLocation: Y.eZ.Location
             *  - struct.contentType: Y.eZ.ContentType
             *
             * @attribute trashItems
             * @required
             * @default []
             * @type Array
             */
            trashItems: {
                value: [],
            },

            /**
             * The trash bar instance, by default an instance {{#crossLink
             * "eZ.TrashBarView"}}eZ.TrashBarView{{/crossLink}}
             *
             * @attribute trashBar
             * @type eZ.BarView
             */
            trashBar: {
                valueFn: function () {
                    return new Y.eZ.TrashBarView({
                        //TODO pass trash items count or something ?
                        //location: this.get('location'),
                        //content: this.get('content'),
                        //contentType: this.get('contentType'),
                        bubbleTargets: this,
                    });
                }
            },
        }
    });
});
