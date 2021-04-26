/*
 * Parser for the CCDA "plan of care" section
 */

'use strict'
let Core = require('../../core');

module.exports = function(doc) {
    let self = this;
    self.doc = doc;

    self.care_plan = function (ccda) {
        let care_plan = ccda.section('care_plan');
    
        let data = {}, el;
        data.entries = [];
        data.displayName = "Care Plan";
        data.templateId = care_plan.tag('templateId').attr('root');
        data.text = care_plan.tag('text').val(true);
    
        care_plan.entries().each(function (entry) {
    
            let name = null,
                code = null,
                code_system = null,
                code_system_name = null;
    
            // Plan of care encounters, which have no other details
            el = entry.template('2.16.840.1.113883.10.20.22.4.40');
            if (!el.isEmpty()) {
                name = 'encounter';
            } else {
                el = entry.tag('code');
    
                name = el.attr('displayName');
                code = el.attr('code');
                code_system = el.attr('codeSystem');
                code_system_name = el.attr('codeSystemName');
            }
    
            let text = Core.stripWhitespace(entry.tag('text').val(true));
            let time = entry.tag('effectiveTime').immediateChildTag('center').attr('value');
    
            data.entries.push({
                text: text,
                name: name,
                code: code,
                code_system: code_system,
                code_system_name: code_system_name,
                effective_time: parse(time)
            });
        });
    
        return data;
    
        function parse(str) {
            if (!str) return null;
            let y = str.substr(0, 4),
                m = str.substr(4, 2) - 1,
                d = str.substr(6, 2);
            let D = new Date(y, m, d);
            return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? D : null;
        }
    };
}
