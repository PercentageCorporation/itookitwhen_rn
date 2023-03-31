import {OrangeData} from './drugData'

export function findDrugNames(searchName) {
    const name = searchName.toUpperCase();
    //console.log('findDrugNames', name);
    if (!name) return [];
    const uname = name.toUpperCase();
 
    const names = [];
    const genericNames = [];
    const tradeNames = [];
    OrangeData.forEach(od => {
        if (od.ingredient.startsWith(uname) && od.ingredient === od.trade_name && !genericNames.includes(od.ingredient)) {
            genericNames.push(od.ingredient);
            const item = {
                'name': od.ingredient,
                'type': 'G',
                'id': od.id.toString()
            }
            names.push(item);
        }
        if (od.trade_name.startsWith(uname) && !genericNames.includes(od.trade_name) && !genericNames.includes(od.trade_name)) {
            tradeNames.push(od.ingredient);
            const item = {
                'name': od.trade_name,
                'generic': od.ingredient,
                'type': 'T',
                'id': od.id.toString()
            }
            names.push(item);
        }
    });
    //console.log(name, names);

    names.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
    
    return names;
}

export function findBrandNames(searchName) {
    const name = searchName.toUpperCase();
    //console.log('findBrandNames', name);
    if (!name) return [];
    const uname = name.toUpperCase();
 
    const names = [];
    const tradeNames = [];
    OrangeData.forEach(od => {
        if (od.ingredient === uname && od.trade_name !== uname && !tradeNames.includes(od.trade_name)) {
            tradeNames.push(od.ingredient);
            const item = {
                'name': od.trade_name,
                'type': 'T',
                'id': od.id.toString()
            }
            names.push(item);
        }
    });
    //console.log('trade', names);

    names.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
    
    return names;
}

export function getStrength(idString, form) {
    const id = parseInt(idString);
    console.log('getStrength', idString, form);
    const item = OrangeData[id-1];
    if (item.forms.length === 1) {
        return item.forms[0].dosage;
    };
    const uform = form.toUpperCase();
    var s = [];
    console.log('numforms', item.forms.length);
    for ( i = 0; i < item.forms.length; ++i) {
        let f = item.forms[i];
        console.log('each form', f);
        if (f.form === uform) {
            s = f.dosage;
            console.log('return s', s);
            return s;
        };
    };
    return [];

    console.log('return1 s', s);
    return s;
}

export function getForms(id) {
    const forms = [];
    if (id===0) return forms;
    console.log('getForms', id);
    const item = OrangeData[id-1];
    item.forms.forEach(f => {
        forms.push(f.form);
    })

    return forms;
}

export function getForm(idString, form) {
    const id = parseInt(idString);
    console.log('getForms', idString, id);
    const item = OrangeData[id-1];
    item.forms.forEach(f => {
        if (f.form === form) return f.form;
    })

    return null;
}
