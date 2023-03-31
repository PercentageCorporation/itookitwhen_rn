import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';

export var resultCB = null;

export function setCB(cb) {resultCB = cb};

function doCB(fnName, results) {
  console.log('doCB', fnName, results);
  if (!resultCB) return null;
  resultCB({fn: fnName, ra: results.rowsAffected});
  console.log('didCB');
}

export const db = SQLite.openDatabase(
  {
    name: 'ITIWDB',
    location: 'default',
  },
  () => {console.log('openDatabase');},
  error => {console.log('openDatabase error', error);},
);

export const userObject = {
  Id: null,
  UserType: 'first',
  DisplayName: '',
  AwakeTime: '06:00AM',
  BedTime: '10:00PM',
  FirebaseId: '',
  DateCreated: 0,
  DateLastUpdated: 0,
};

export async function dropAllTables() {
  dropTable('Users');
  dropTable('Meds');
  dropTable('History');
}

export async function dropTable(table) {
  console.log('dropTable', table);
  var q = 'DROP TABLE IF EXISTS ' + table;
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q,
        [],
        (tx,result) => {console.log('dropTable', tx, result)},
        (tx,error) => {console.log('dropTable', tx, error)}
      );
    });
  } catch (error) {
    console.log('dropTable error', error);
  }
}

export async function checkTableExists(table) {
    const q = "SELECT name FROM sqlite_master WHERE type='table' AND name='?';"
    console.log('checkTableExists', table);
    try {
      await db.transaction(tx => {
        tx.executeSql(
            q,
            [table],
            (tx, results) => {console.log('checkTableExists', results)},
            (tx, error) => {console.log('checkTableExists error', error)},
        );
      });
    } catch (error) {
      console.log('checkTableExists error', error);
    }
  }
  
  
export async function createUsersTable() {
  await db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users' +
        ' (Id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        ' UserType TEXT, DisplayName TEXT, AwakeTime TEXT, BedTime TEXT' +
        ', FirebaseId TEXT, DateCreated INTEGER, DateLastUpdated INTEGER' +
        ')',
        [],
        (tx, results) => {console.log('createUsersTable results', results);},
        (tx,error) => {console.log('createUsersTable error', tx, error)}
    );
  });
}

// id: "2MV2XRGwHIPQABgqheOy",
// name: "L-Dopa",
// description: "L-Dopa",
// form: "powder",
// measurement: "mg",
// schedule: "",
// occurance: 3,
// often: "hour",
// dosage: "200MG",
// sortOrder: 99,

export const MedsObject = {
  Id: '',
  Name: '',
  Brand: '',
  Type: 'Other',
  Description: '',
  Form: '',
  Strength: '',
  Schedule: '',
  Occurance: 0,
  Often: '',
  Dosage: 0,
  SortOrder: 99,
  DateCreated: 0,
  DateLastUpdated: 0,
  OrangeId: 0,
  Paused: false,
};

export async function createMedsTable() {
  console.log('createMedsTable');
  await db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Meds' +
        ' (Id TEXT,' +
        ' Name TEXT, Brand TEXT, Description TEXT' +
        ', Form TEXT, Strength TEXT, Dosage NUMBER, Occurance INTEGER, Often TEXT' +
        ', Schedule TEXT, SortOrder INTEGER' +
        ', DateEntered INTEGER, DateLastUpdated INTEGER' +
        ');' +
        'ALTER TABLE Meds ADD PRIMARY KEY (Id);',
        [],
        (tx, results) => {console.log('createMedsTable results', results)},
        (tx,error) => {console.log('createMedsTable error', tx, error)}
    );
  });
}

// id: "03JWggxgkXrtckaMi7s1",
// date: 1644509700,
// status: "taken",
// quantity: 1,
// medicationId: "lUndouO1rxSDSApPw28r",

export const HistoryObject = {
  Id: '',
  Date: 0,
  Status: '',
  Quantity: 0.0,
  MedicationId: '',
};

export async function createHistoryTable() {
  console.log('createHistoryTable');
  await db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS History' +
        ' (Id TEXT,' +
        ' Date INTEGER, Status TEXT, Quantity REAL' +
        ', MedicationId TEXT' +
        ')', +
        'ALTER TABLE History ADD PRIMARY KEY (Id);',
        [],
        (tx, results) => {console.log('createHistoryTable results', results);},
        (tx,error) => {console.log('createHistoryTable error', tx, error)}
    );
  });
}

export async function createAllTables() {
  await createUsersTable();
  await createMedsTable();
  await createHistoryTable();
}

export async function addUser(user) {
  console.log('addUser', user);
  const q =
    'INSERT INTO Users (UserType, DisplayName, AwakeTime, BedTime, FirebaseId, DateCreated)' +
    ' VALUES (?,?,?,?,?,?) ';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [
        user.UserType,
        user.DisplayName,
        user.AwakeTime,
        user.BedTime,
        user.FirebaseId,
        moment().unix().toString(),
        ],
        (tx, results) => {
          callback(u);
          console.log('addUser results', results);
        },
        (tx,error) => {
          callback(null);
          console.log('addUser', tx, error);
      }
      );
    });
  } catch (error) {
    console.log('addUser error', error);
  }
}

export async function updateUser(user) {
  console.log('addUser', user);
  const q =
    'UPDATE Users SET UserType=?, DisplayName=?, AwakeTime=?, BedTime=?, FirebaseId=?, DateCreated=?' +
    ' WHERE Id=?';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [
        user.UserType,
        user.DisplayName,
        user.AwakeTime,
        user.BedTime,
        user.FirebaseId,
        moment().unix().toString(),
        user.Id
        ],
        (tx, results) => {console.log('updateUser results', results);},
        (tx,error) => {console.log('updateUser error', tx, error)}
        );
    });
  } catch (error) {
    console.log('updateUser trap', error);
  }
}

export async function deleteUsers(user) {
  const q = 'DELETE FROM Users';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [], 
        (tx, results) => {console.log('deleteUsers results', results)},
        (tx, error) => {console.log('deleteUsers error', error)}
      );
    });
  } catch (error) {
    console.log('deleteUsers error', error);
  }
}

export async function getUser(callback) {
  console.log('getUser');
  const q = 'SELECT * FROM Users';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [],
        (tx, results) => {
        //console.log('gu results', results);
        var len = results.rows.length;
        let u = null;
        if (len > 0) {
          u = results.rows.item(0);
          const user = {
            Id: u.id,
            UserType: u.UserType,
            DisplayName: u.DisplayName,
            AwakeTime: u.AwakeTime,
            BedTime: u.BedTime,
            FirebaseId: u.FirebaseId,
            DateCreated: u.DateCreated,
            DateLastUpdated: u.DateLastUpdated,
          };
        }
        console.log('getUser results', u);
        callback(u);
      },
      (tx, error) => {
        console.log('getUser error', tx, error)
        callback(null);
      }
      );
    });
  } catch (error) {
    console.log('getUser error', error);
  }
}

export async function deleteMeds(user) {
  const q = 'DELETE FROM Meds';
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [], 
        (tx, results) => {console.log('deleteMeds results', results)},
        (tx, error) => {console.log('deleteMeds error', error)}
    )})
  } catch (error) {
    console.log('deleteMeds error', error);
  }
}

export async function deleteMed(Id) {
  const q = 'DELETE FROM Meds WHERE Id="' + Id + '";'
    + 'DELETE FROM History WHERE MedicationId="' + Id + '";';
   console.log('deleteMed', Id, q)
   try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [], 
        (tx, results) => {
          console.log('deleteMed results', results)
          doCB('deleteMed', results);
        },
        (tx, error) => {console.log('deleteMed error', error)}
    )
  })
  } catch (error) {
    console.log('deleteMed error', error);
  }
}

export async function addMed(med) {
  console.log('addMed', med);
  let q = 'INSERT INTO Meds (Id, Name, Brand, Description, Form, Strength, Schedule, Occurance, Often, Dosage, SortOrder, DateEntered, DateLastUpdated)' +
    ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [
        med.Id,
        med.Name,
        med.Brand,
        med.Description,
        med.Form,
        med.Strength,
        med.Schedule.toString(),
        med.Occurance,
        med.Often,
        med.Dosage,
        med.SortOrder,
        moment().unix(),
        moment().unix(),
      ],
      (tx, results) => {
        console.log('addMed results', results, results.item)
        doCB('addMed', results);
      },
      (tx,error) => {console.log('addMed error', tx, error)}
    );
    });
  } catch (error) {
    console.log('addMed error', error);
  }
}

export async function getMeds(callback) {
  console.log('getMeds')
  const q = 'SELECT *, h.Date, h.MedicationId FROM Meds LEFT JOIN'
  + '(SELECT Date, MedicationId FROM History WHERE Date IN (SELECT MAX(Date) FROM History GROUP BY MedicationId)) AS h'
  + ' ON Meds.Id=h.MedicationId'
  + ' ORDER BY SortOrder ASC';
  try {
    await db.transaction(tx => {
      tx.executeSql(q, 
      [],
      (tx, results) => {
        var len = results.rows.length;
        //console.log('getMeds results', results.rows)
        let meds = [];
        for (let i = 0; i < len; i++) {
          let item = results.rows.item(i);
          //console.log(item);
          meds.push(item);
        };
        //console.log('cb meds',meds);
        callback(meds);
          },
        (tx, error) => {
          console.log('getMeds error', tx, error)
          callback([]);
        }
        );
        });
  } catch (error) {
    console.log('getMeds error', error);
  }
}

export async function updateSortOrder(medId, sortOrder) {
  console.log('updateSortOrder', medId, sortOrder);
  let q = 'UPDATE Meds SET SortOrder=? WHERE Id=?;';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [
          sortOrder,
          medId,
        ],
        (tx, results) => {
          console.log('updateSortOrder results', results)
          doCB('updateSortOrder', results);
        },
        (tx,error) => {console.log('updateSortOrder error', tx, error)}
      );
      });
  } catch (error) {
    console.log('updateSortOrder error', error);
  }
}

export async function addHistory(hist) {
  console.log('addHistory', hist);
  const q = 'INSERT INTO History (Id, Date, Status, Quantity, MedicationId)' +
    ' VALUES(?,?,?,?,?)';

  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [
        hist.Id,
        hist.Date.toString(),
        hist.Status,
        hist.Quantity.toString(),
        hist.MedicationId,
        ],
        (tx, results) => {
          doCB('addHistory', results);
          console.log('addHistory results', results, results.item)
        },
        (tx,error) => {console.log('addHistory error', tx, error)}
        );
    });
  } catch (error) {
    console.log('addHistory error', error);
  }
}
export async function deleteAllHistory() {
  const q = 'DELETE FROM History';
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [], 
        (tx, results) => {console.log('deleteAllHistory results', results)},
        (tx, error) => {console.log('deleteAllHistory error', error)}
    )})
  } catch (error) {
    console.log('deleteAllHistory error', error);
  }
}

export async function deleteHistory(hId) {
  const q = 'DELETE FROM History WHERE History.Id=?;';
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q, 
        [hId], 
        (tx, results) => {
          doCB('deleteHistory', results);
          console.log('deleteHistory results', results);
        },
        (tx, error) => {console.log('deleteHistory error', error)}
    )})
  } catch (error) {
    console.log('deleteHistory error', error);
  }
}

export async function getHistory(callback) {
  console.log('getHistory')
  const q = 'SELECT History.*, Name FROM History' +
  ' INNER JOIN Meds ON Meds.Id=History.MedicationId' +
  ' ORDER BY Date DESC';
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q,
        [],
        (tx, results) => {
          var len = results.rows.length;
          console.log('getHistory results', len)
          let hist = [];
          for (let i = 0; i < len; i++) {
            let item = results.rows.item(i);
            hist.push(item);
          }
          //console.log('cb hist',hist);
          callback(hist);
        },
        (tx, error) => {
          console.log('getHistory error', tx, error);
          callback([]);
        },
      );
    });
  } catch (error) {
    console.log('getHistory error', error);
  }
}

export async function getMedHistory(medId, callback) {
  console.log('getMedHistory',medId)
  const q = 'SELECT History.*, Name FROM History' +
  ' INNER JOIN Meds ON Meds.Id=History.MedicationId' +
  ' WHERE History.MedicationId=? ORDER BY Date DESC';
  try {
    await db.transaction(tx => {
      tx.executeSql(
        q,
        [medId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('getMedHistory results', len)
          let hist = [];
          for (let i = 0; i < len; i++) {
            let item = results.rows.item(i);
            hist.push(item);
          }
          //console.log('cb hist',hist);
          callback(hist);
        },
        (tx, error) => {
          console.log('getMedHistory error', tx, error);
          callback([]);
        },
      );
    });
  } catch (error) {
    console.log('getMedHistory error', error);
  }
}
