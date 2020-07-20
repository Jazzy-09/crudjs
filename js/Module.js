const storedb = (dbname, table) => {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();

    return db;
};

// insert data
const bulkcreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
        dbtable.bulkAdd([data]);
        console.log("data inserted successfully...!");
    } else {
        console.log("Please provide data...!");
    }
    return flag;
};

// check textbox validation
const empty = object => {
    let flag = false;
    for (const value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

// getData from database
const getData = (dbtable, fn) => {
    let index = 0;
    let obj = {};

    dbtable.count((count) => {
        if (count) {
            dbtable.each(table => {
                // console.log(table);

                obj = SortObj(table);
                fn(obj, index++);
            })
        } else {
            fn(0);
        }
    })
}

// manipulation my object to sorting
const SortObj = (sortobj) => {
    let obj = {};
    obj = {
        id: sortobj.id,
        name: sortobj.name,
        seller: sortobj.seller,
        price: sortobj.price
    };
    return obj;
}

// create elements
const createEle = (tagname, appendTo, fn) => {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);
};

export default storedb;
export {
    bulkcreate,
    getData,
    createEle,
    SortObj
}