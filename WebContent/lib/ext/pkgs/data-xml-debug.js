/*!
 * Ext JS Library 3.0.3
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.data.XmlWriter
 * @extends Ext.data.DataWriter
 * DataWriter extension for writing an array or single {@link Ext.data.Record} object(s) in preparation for executing a remote CRUD action via XML.
 */
Ext.data.XmlWriter = function(params) {
    Ext.data.XmlWriter.superclass.constructor.apply(this, arguments);
    this.tpl = new Ext.XTemplate(this.tpl).compile();
};
Ext.extend(Ext.data.XmlWriter, Ext.data.DataWriter, {
    /**
     * @cfg {String} root [records] The name of the root element when writing <b>multiple</b> records to the server.  Each
     * xml-record written to the server will be wrapped in an element named after {@link Ext.data.XmlReader#record} property.
     * eg:
<code><pre>
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;user>&lt;first>Barney&lt;/first>&lt;/user>
</code></pre>
     * However, when <b>multiple</b> records are written in a batch-operation, these records must be wrapped in a containing
     * Element.
     * eg:
<code><pre>
&lt;?xml version="1.0" encoding="UTF-8"?>
    &lt;records>
        &lt;first>Barney&lt;/first>&lt;/user>
        &lt;records>&lt;first>Barney&lt;/first>&lt;/user>
    &lt;/records>
</code></pre>
     * Defaults to <tt>records</tt>
     */
    root: 'records',
    /**
     * @cfg {String} xmlVersion [1.0] The <tt>version</tt> written to header of xml documents.
<code><pre>&lt;?xml version="1.0" encoding="ISO-8859-15"?></pre></code>
     */
    xmlVersion : '1.0',
    /**
     * @cfg {String} xmlEncoding [ISO-8859-15] The <tt>encoding</tt> written to header of xml documents.
<code><pre>&lt;?xml version="1.0" encoding="ISO-8859-15"?></pre></code>
     */
    xmlEncoding: 'ISO-8859-15',
    /**
     * @cfg {String} tpl The xml template.  Defaults to
<code><pre>
&lt;?xml version="{version}" encoding="{encoding}"?>
    &lt;tpl if="{[values.nodes.length>1]}">&lt;{root}}>',
    &lt;tpl for="records">
        &lt;{parent.record}>
        &lt;tpl for="fields">
            &lt;{name}>{value}&lt;/{name}>
        &lt;/tpl>
        &lt;/{parent.record}>
    &lt;/tpl>
    &lt;tpl if="{[values.records.length>1]}">&lt;/{root}}>&lt;/tpl>
</pre></code>
     */
    // Break up encoding here in case it's being included by some kind of page that will parse it (eg. PHP)
    tpl: '<tpl for="."><' + '?xml version="{version}" encoding="{encoding}"?' + '><tpl if="documentRoot"><{documentRoot}><tpl for="baseParams"><tpl for="."><{name}>{value}</{name}</tpl></tpl></tpl><tpl if="records.length&gt;1"><{root}></tpl><tpl for="records"><{parent.record}><tpl for="."><{name}>{value}</{name}></tpl></{parent.record}></tpl><tpl if="records.length&gt;1"></{root}></tpl><tpl if="documentRoot"></{documentRoot}></tpl></tpl>',

    /**
     * Final action of a write event.  Apply the written data-object to params.
     * @param {String} action [Ext.data.Api.create|read|update|destroy]
     * @param {Ext.data.Record/Ext.data.Record[]} rs
     * @param {Object} http params
     * @param {Object/Object[]} rendered data.
     */
    render : function(action, rs, params, data) {
        params.xmlData = this.tpl.applyTemplate({
            version: this.xmlVersion,
            encoding: this.xmlEncoding,
            record: this.meta.record,
            root: this.root,
            records: (Ext.isArray(rs)) ? data : [data]
        });
    },

    /**
     * Converts an Ext.data.Record to xml
     * @param {Ext.data.Record} rec
     * @return {String} rendered xml-element
     * @private
     */
    toXml : function(data) {
        var fields = [];
        Ext.iterate(data, function(k, v) {
            fields.push({
                name: k,
                value: v
            });
        },this);
        return {
            fields: fields
        };
    },

    /**
     * createRecord
     * @param {Ext.data.Record} rec
     * @return {String} xml element
     * @private
     */
    createRecord : function(rec) {
        return this.toXml(this.toHash(rec));
    },

    /**
     * updateRecord
     * @param {Ext.data.Record} rec
     * @return {String} xml element
     * @private
     */
    updateRecord : function(rec) {
        return this.toXml(this.toHash(rec));

    },
    /**
     * destroyRecord
     * @param {Ext.data.Record} rec
     * @return {String} xml element
     */
    destroyRecord : function(rec) {
        var data = {};
        data[this.meta.idProperty] = rec.id;
        return this.toXml(data);
    }
});

/**
 * @class Ext.data.XmlReader
 * @extends Ext.data.DataReader
 * <p>Data reader class to create an Array of {@link Ext.data.Record} objects from an XML document
 * based on mappings in a provided {@link Ext.data.Record} constructor.</p>
 * <p><b>Note</b>: that in order for the browser to parse a returned XML document, the Content-Type
 * header in the HTTP response must be set to "text/xml" or "application/xml".</p>
 * <p>Example code:</p>
 * <pre><code>
var Employee = Ext.data.Record.create([
   {name: 'name', mapping: 'name'},     // "mapping" property not needed if it is the same as "name"
   {name: 'occupation'}                 // This field will use "occupation" as the mapping.
]);
var myReader = new Ext.data.XmlReader({
   totalProperty: "results", // The element which contains the total dataset size (optional)
   record: "row",           // The repeated element which contains row information
   idProperty: "id"         // The element within the row that provides an ID for the record (optional)
   messageProperty: "msg"   // The element within the response that provides a user-feedback message (optional)
}, Employee);
</code></pre>
 * <p>
 * This would consume an XML file like this:
 * <pre><code>
&lt;?xml version="1.0" encoding="UTF-8"?>
&lt;dataset>
 &lt;results>2&lt;/results>
 &lt;row>
   &lt;id>1&lt;/id>
   &lt;name>Bill&lt;/name>
   &lt;occupation>Gardener&lt;/occupation>
 &lt;/row>
 &lt;row>
   &lt;id>2&lt;/id>
   &lt;name>Ben&lt;/name>
   &lt;occupation>Horticulturalist&lt;/occupation>
 &lt;/row>
&lt;/dataset>
</code></pre>
 * @cfg {String} totalProperty The DomQuery path from which to retrieve the total number of records
 * in the dataset. This is only needed if the whole dataset is not passed in one go, but is being
 * paged from the remote server.
 * @cfg {String} record The DomQuery path to the repeated element which contains record information.
 * @cfg {String} record The DomQuery path to the repeated element which contains record information.
 * @cfg {String} successProperty The DomQuery path to the success attribute used by forms.
 * @cfg {String} idPath The DomQuery path relative from the record element to the element that contains
 * a record identifier value.
 * @constructor
 * Create a new XmlReader.
 * @param {Object} meta Metadata configuration options
 * @param {Object} recordType Either an Array of field definition objects as passed to
 * {@link Ext.data.Record#create}, or a Record constructor object created using {@link Ext.data.Record#create}.
 */
Ext.data.XmlReader = function(meta, recordType){
    meta = meta || {};

    // backwards compat, convert idPath to idProperty
    meta.idProperty = meta.idProperty || meta.idPath;

    Ext.data.XmlReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};
Ext.extend(Ext.data.XmlReader, Ext.data.DataReader, {
    /**
     * This method is only used by a DataProxy which has retrieved data from a remote server.
     * @param {Object} response The XHR object which contains the parsed XML document.  The response is expected
     * to contain a property called <tt>responseXML</tt> which refers to an XML document object.
     * @return {Object} records A data block which is used by an {@link Ext.data.Store} as
     * a cache of Ext.data.Records.
     */
    read : function(response){
        var doc = response.responseXML;
        if(!doc) {
            throw {message: "XmlReader.read: XML Document not available"};
        }
        return this.readRecords(doc);
    },

    /**
     * Create a data block containing Ext.data.Records from an XML document.
     * @param {Object} doc A parsed XML document.
     * @return {Object} records A data block which is used by an {@link Ext.data.Store} as
     * a cache of Ext.data.Records.
     */
    readRecords : function(doc){
        /**
         * After any data loads/reads, the raw XML Document is available for further custom processing.
         * @type XMLDocument
         */
        this.xmlData = doc;

        var root    = doc.documentElement || doc,
            q       = Ext.DomQuery,
            totalRecords = 0,
            success = true;

        if(this.meta.totalProperty){
            totalRecords = this.getTotal(root, 0);
        }
        if(this.meta.successProperty){
            success = this.getSuccess(root);
        }

        var records = this.extractData(q.select(this.meta.record, root), true); // <-- true to return Ext.data.Record[]

        // TODO return Ext.data.Response instance.  @see #readResponse
        return {
            success : success,
            records : records,
            totalRecords : totalRecords || records.length
        };
    },

    /**
     * Decode a json response from server.
     * @param {String} action [{@link Ext.data.Api#actions} create|read|update|destroy]
     * @param {Ext.data.Response} response Returns an instance of {@link Ext.data.Response}
     */
    readResponse : function(action, response) {
        var q   = Ext.DomQuery,
        doc     = response.responseXML;

        var res = new Ext.data.Response({
            action: action,
            success : this.getSuccess(doc),
            message: this.getMessage(doc),
            data: this.extractData(q.select(this.meta.record, doc) || q.select(this.meta.root, doc)),
            raw: doc
        });

        if (Ext.isEmpty(res.success)) {
            throw new Ext.data.DataReader.Error('successProperty-response', this.meta.successProperty);
        }

        if (action === Ext.data.Api.actions.create) {
            var def = Ext.isDefined(res.data);
            if (def && Ext.isEmpty(res.data)) {
                throw new Ext.data.JsonReader.Error('root-empty', this.meta.root);
            }
            else if (!def) {
                throw new Ext.data.JsonReader.Error('root-undefined-response', this.meta.root);
            }
        }
        return res;
    },

    getSuccess : function() {
        return true;
    },

    /**
     * build response-data extractor functions.
     * @private
     * @ignore
     */
    buildExtractors : function() {
        if(this.ef){
            return;
        }
        var s       = this.meta,
            Record  = this.recordType,
            f       = Record.prototype.fields,
            fi      = f.items,
            fl      = f.length;

        if(s.totalProperty) {
            this.getTotal = this.createAccessor(s.totalProperty);
        }
        if(s.successProperty) {
            this.getSuccess = this.createAccessor(s.successProperty);
        }
        if (s.messageProperty) {
            this.getMessage = this.createAccessor(s.messageProperty);
        }
        this.getRoot = function(res) {
            return (!Ext.isEmpty(res[this.meta.record])) ? res[this.meta.record] : res[this.meta.root];
        }
        if (s.idPath || s.idProperty) {
            var g = this.createAccessor(s.idPath || s.idProperty);
            this.getId = function(rec) {
                var id = g(rec) || rec.id;
                return (id === undefined || id === '') ? null : id;
            };
        } else {
            this.getId = function(){return null;};
        }
        var ef = [];
        for(var i = 0; i < fl; i++){
            f = fi[i];
            var map = (f.mapping !== undefined && f.mapping !== null) ? f.mapping : f.name;
            ef.push(this.createAccessor(map));
        }
        this.ef = ef;
    },

    /**
     * Creates a function to return some particular key of data from a response.
     * @param {String} key
     * @return {Function}
     * @private
     * @ignore
     */
    createAccessor : function(){
        var q = Ext.DomQuery;
        return function(key) {
            switch(key) {
                case this.meta.totalProperty:
                    return function(root, def){
                        return q.selectNumber(key, root, def);
                    }
                    break;
                case this.meta.successProperty:
                    return function(root, def) {
                        var sv = q.selectValue(key, root, true);
                        var success = sv !== false && sv !== 'false';
                        return success;
                    }
                    break;
                default:
                    return function(root, def) {
                        return q.selectValue(key, root, def);
                    }
                    break;
            }
        };
    }(),

    /**
     * Extracts rows of record-data from server.  iterates and calls #extractValues
     * TODO I don't care much for method-names of #extractData, #extractValues.
     * @param {Array} root
     * @param {Boolean} returnRecords When true, will return instances of Ext.data.Record; otherwise just hashes.
     * @private
     * @ignore
     */
    extractData : function(root, returnRecords) {
        var Record  = this.recordType,
        records     = [],
        f           = Record.prototype.fields,
        fi          = f.items,
        fl          = f.length;
        if (returnRecords === true) {
            for (var i = 0, len = root.length; i < len; i++) {
                var data = root[i],
                    record = new Record(this.extractValues(data, fi, fl), this.getId(data));
                    
                record.node = data;
                records.push(record);
            }
        } else {
            for (var i = 0, len = root.length; i < len; i++) {
                records.push(this.extractValues(root[i], fi, fl));
            }
        }
        return records;
    },

    /**
     * extracts values and type-casts a row of data from server, extracted by #extractData
     * @param {Hash} data
     * @param {Ext.data.Field[]} items
     * @param {Number} len
     * @private
     * @ignore
     */
    extractValues : function(data, items, len) {
        var f, values = {};
        for(var j = 0; j < len; j++){
            f = items[j];
            var v = this.ef[j](data);
            values[f.name] = f.convert((v !== undefined) ? v : f.defaultValue, data);
        }
        return values;
    }
});/**
 * @class Ext.data.XmlStore
 * @extends Ext.data.Store
 * <p>Small helper class to make creating {@link Ext.data.Store}s from XML data easier.
 * A XmlStore will be automatically configured with a {@link Ext.data.XmlReader}.</p>
 * <p>A store configuration would be something like:<pre><code>
var store = new Ext.data.XmlStore({
    // store configs
    autoDestroy: true,
    storeId: 'myStore',
    url: 'sheldon.xml', // automatically configures a HttpProxy
    // reader configs
    record: 'Item', // records will have an "Item" tag
    idPath: 'ASIN',
    totalRecords: '@TotalResults'
    fields: [
        // set up the fields mapping into the xml doc
        // The first needs mapping, the others are very basic
        {name: 'Author', mapping: 'ItemAttributes > Author'},
        'Title', 'Manufacturer', 'ProductGroup'
    ]
});
 * </code></pre></p>
 * <p>This store is configured to consume a returned object of the form:<pre><code>
&#60?xml version="1.0" encoding="UTF-8"?>
&#60ItemSearchResponse xmlns="http://webservices.amazon.com/AWSECommerceService/2009-05-15">
    &#60Items>
        &#60Request>
            &#60IsValid>True&#60/IsValid>
            &#60ItemSearchRequest>
                &#60Author>Sidney Sheldon&#60/Author>
                &#60SearchIndex>Books&#60/SearchIndex>
            &#60/ItemSearchRequest>
        &#60/Request>
        &#60TotalResults>203&#60/TotalResults>
        &#60TotalPages>21&#60/TotalPages>
        &#60Item>
            &#60ASIN>0446355453&#60/ASIN>
            &#60DetailPageURL>
                http://www.amazon.com/
            &#60/DetailPageURL>
            &#60ItemAttributes>
                &#60Author>Sidney Sheldon&#60/Author>
                &#60Manufacturer>Warner Books&#60/Manufacturer>
                &#60ProductGroup>Book&#60/ProductGroup>
                &#60Title>Master of the Game&#60/Title>
            &#60/ItemAttributes>
        &#60/Item>
    &#60/Items>
&#60/ItemSearchResponse>
 * </code></pre>
 * An object literal of this form could also be used as the {@link #data} config option.</p>
 * <p><b>Note:</b> Although not listed here, this class accepts all of the configuration options of 
 * <b>{@link Ext.data.XmlReader XmlReader}</b>.</p>
 * @constructor
 * @param {Object} config
 * @xtype xmlstore
 */
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    constructor: function(config){
        Ext.data.XmlStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.XmlReader(config)
        }));
    }
});
Ext.reg('xmlstore', Ext.data.XmlStore);
