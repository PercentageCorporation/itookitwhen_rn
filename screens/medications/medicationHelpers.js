import moment from 'moment';
import { testHist } from '../../utils/History';
import { testMeds } from '../../utils/Meds';

  export function formatTime(ts) {
    return moment(ts).format('llll');
  }

  const perDay = [
    'Never',
    'Once a day',
    'Twice a day',
    'Three times a day',
    'Four times a day',
    'Five times a day',
    'Six times a day'
  ];
  export function formatOftenX(occurance, often) {
    let times = 'Whenever';
    if (often === 'daily') {
        times = perDay[occurance];
        return (times);
      }
    }

  export function formatDosage(med,user) {
    //console.log('fd',med);
    let dosage = '';
    if (!med) return dosage;
    switch (med.Form) {
      case 'powder':
        dosage += med.Strength;
        break;
      default:
        dosage += med.Dosage + ' ' + med.Form;
        break;
    }

    //dosage += med.dosage + ' ' + med.measurement;
    dosage += formatOften(med);
    if (med.WhileAwake) {
      dosage += formatStarting(med,user);
      dosage += formatEnding(med,user);
    }
    //console.log('fd', med.name, dosage);
    return dosage;
  }

  export function formatOften(med) {
    //console.log('formatOften',med);
    let often = '';
    if (!med) return often;
    if (med.Often === 'hourly') {
      let n = parseFloat(med.Occurance);
      often += ' every ';
      often += n + ' ' + med.Often;
      if (n > 1) often += 's';
    } else if (med.Often === 'daily') {
      often += ' ' + med.Occurance + ' times a day';
    } else if (med.Often === 'asNeeded') {
      often += ' as needed ';
    }
    return often;
  }

  export function formatStarting(med,user) {
    if (!med.often) return '';
    if (!user) return '';
    let starting = ' starting at ';
    starting += med.times ? med.times : user.awakeTime;
    return starting;
  }

  export function formatEnding(med,user) {
    if (!med.often) return '';
    let starting = ' ending at ';
    starting += med.times ? med.times : user.bedTime;
    return starting;
  }

  // convert HH:MMAM to minutes since midnight
  export function timeToMinutes(time) {
    if (!time) return 0;
    let min = 0;
    let parts = time.split(':');
    if (parts.length === 2) {
      min += parseInt(parts[0]) * 60;
      min += parseInt(parts[1]);
    }
    if (time[5] === 'P') min += 720;
    //console.log(time, min)
    return min;
  }

  // convert minutes to HH:MMxM
  export function minutesToTime(minutes) {
    let ampm = 'AM';
    if (minutes >= 720) {
      minutes -= 720;
      ampm = 'PM';
    }
    const hrs = minutes / 60;
    const min = minutes % 60;
    //console.log(minutes, hrs, min);

    return twoDigits(hrs) + ':' + twoDigits(min) + ampm;
  }

  export function twoDigits(n) {
    return n > 9 ? '' + n : '0' + n;
  }

  // get minutes since midnight from Date()
  export function minutesSinceMidnight(mmt) {
    var mmtMidnight = mmt.startOf('day');
    var diffMinutes = mmt.diff(mmtMidnight, 'minutes');
    return diffMinutes;
  }

  // convert HH:MMxM to Date()
  // adds minutes to current date (as of midnight)
  export function timeToMoment(time) {
    if (!time) return null;
    const min = timeToMinutes(time);
    let date = moment().startOf('day').add(min, 'm');
    return date;
  }

  export function timeToDate(time) {
    let date = timeToMoment(time).toDate();
    return date;
  }

  export function nextOccurance(med,user) {

    const now = moment().startOf('m');
    const awakeToday = med.whileAwake
      ? timeToMoment(user.awakeTime)
      : moment().startOf('day');
    const awakeTomorrow = moment(awakeToday).add(1, 'day'); // next time to take
    const bedToday = med.whileAwake
      ? timeToMoment(user.bedTime)
      : moment().add(1, 'day').startOf('day');
    //console.log(med.name, awakeToday, bedToday, now);

    if (med.often === 'hour') {
      let n = parseFloat(med.occurance) * 60; // every n minutes starting at start time
      // find first time greater than current time
      let ntt = awakeToday; // next time to take
      //console.log('at', awakeTomorrow);
      while (true) {
        ntt.add(n, 'm');
        //console.log('ntt', ntt);
        if (ntt > bedToday || ntt.day() > bedToday.day()) {
          // after bedtime, get tomorrows date
          ntt = awakeTomorrow;
          //console.log('ntt-t', ntt);
          break; // by definition this will be > now
        } else if (ntt >= now) break;
      }
      //console.log('mtt', ntt);
      return ntt.toDate();
    }

    if (med.often === 'daily') {
      if (med.occurance === 1) {
        // should check for set time or awake or bed time
        return awakeToday.toDate();
      }
      let awake = moment.duration(bedToday.diff(awakeToday)).asMinutes();
      let n = parseFloat(awake) / (med.occurance - 1.0); // every n minutes starting at start time
      let ntt = awakeToday; // next time to take
      //console.log('awake times', med.name, awake, med.occurance, n, ntt);
      // find first time greater than current time
      while (ntt < now) {
        ntt.add(n, 'm');
        //console.log('ntt', ntt, bedToday);
        if (ntt > bedToday || ntt.day() > bedToday.day()) {
          // after bedtime, get tomorrows date
          ntt = awakeTomorrow;
          //console.log('ntt-t', ntt);
          break; // by definition this will be > now
        }
      }
      //console.log('mtt', ntt);
      return ntt.toDate();
    }
  }

  export function updateHistory(meds,history) {

    if (typeof updateHistory.counter === 'undefined') {
      updateHistory.counter = 0;
    }
    updateHistory.counter++;
    //console.log('updateHistory', updateHistory.counter, meds, history);

    if (!meds || !history) return false;

    let newAdded = false;

    meds.forEach((med, ix) => {
      //console.log(med.name);
      const next = nextOccurance(med);
      const latest = getLatestHistory(med.id);
      let due = new Date(2000, 1, 1, 0, 0);
      if (latest) due = latest.due;
      //console.log('latest',due);
      // if the next due date is greater than the latest due date, add to history
      if (next > due) {
        let newHist = {
          medication: med.name,
          medicationId: med.id,
          due: next,
          dueAdjusted: next,
          skipped: false,
          missed: false,
        };
        //console.log('newHist', med.name, next);
        //addHistoryToFirestore(newHist);
        newAdded = true;
      }
    });
    return newAdded;
  }

  export function lookupMed(medId) {
    const meds = testMeds;
    let mc = null;
    if (!meds) return mc;
    for ( var i = 0; i < meds.length; ++i) {
      const m = meds[i];
      if (m.id === medId) {
        mc = meds[i];
        return mc;
      }
    }
    return mc;
  };

  export function medicationOverdue(hist) {
    if (hist.taken) return false;
    const now = moment().toDate();
    if (hist.due > now) return false;
    return true;
  }

  export function getLatestHistory(mId) {
    const history = testHist;
    //console.log('glh', mId);
    let latest = new Date(2000, 1, 1, 0, 0);
    let latestHist = null;
    for ( var i = 0; i < history.length; ++i) {
      const h = history[i];
      if (mId === h.medicationId) {
        //console.log('glh hist', h);
        if (h.date > latest) {
          latestHist = h;
          latest = h.due;
        }
      }
    };
    return latestHist;
  }

  export function getLastTaken(mId) {
    const history = testHist;
    //console.log('glt', history, mId);
    let latest = new Date(2000, 1, 1, 0, 0);
    let latestHist = null;
    if (!history) return latest;
    for ( var i = 0; i < history.length; ++i) {
      let h = history[i];
      //console.log('glt h', h);
      if (mId === h.medicationId && h.status === 'taken') {
        //console.log('glt hist', latest, h.date);
        if (h.date > latest) {
          latestHist = h;
          latest = h.date;
        }
      }
    };
    //console.log('glt latest',latestHist);
    return latestHist;
  }

  export function medicationDue(med) {
    if (med.often === 'asneeded') return false;
    const lastTaken = getLastTaken(med.id);
    //console.log('lastTaken',lastTaken);
    if (!lastTaken) return true; // assume if not taken then it is due
    const lt = moment(lastTaken.date);
    //console.log('lt',lt);
    if (!lt.isSame(new Date(), 'day')) return true; // if not taken today then assume it is due
    // at this point the latest was taken today

    const startHours = 6.0;
    const endHours = 22.0;
    const hours = (endHours - startHours) / (med.occurance - 1); // hours between pills
    // assume an awake time of 6 am and bed time of 10 pm
    const now = moment();
    //console.log('now',now);
    const dur = moment.duration(now.diff(lt));
    //console.log('dur',dur);
    const hoursSinceLastTaken = dur.asHours();
    //console.log('hslt',hoursSinceLastTaken,hours);

    if (med.often === 'daily') {
      if (med.occurance === 1) return false; // one a day and we have taken one already
      if (hoursSinceLastTaken >= hours - 0.5) return true; // time to go
    } else if (med.often === 'hour') {
      const overdue = hoursSinceLastTaken >= med.occurance;
      if (overdue > 0) return true;
    }

    return false;
  }

  export function timeGrid() {
    var d = moment().set('hour', 0).set('minute', 0).set('seconds', 0);
    var tg = [];
    tg.push(d.format('hh:mm A'));
    for (var i = 0; i < 95; i++) {
      d.add(15, 'minutes');
      //    var nd = moment(JSON.parse(JSON.stringify(d)));
      tg.push(d.format('hh:mm A'));
    }
    return tg;
  }

export function parseForm(form) {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  var i,
    j,
    q = [],
    o = {};
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'email':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            o[form.elements[i].name] = form.elements[i].value;
            q.push(form.elements[i].name + ':' + form.elements[i].value);
            break;
          case 'checkbox':
          case 'radio':
            o[form.elements[i].name] = form.elements[i].checked ? true : false;
            q.push(form.elements[i].name + (form.elements[i].checked ? ':true' : ':false'));
            break;
          default:
            break;
        }
        break;
      case 'file':
        break;
      case 'TEXTAREA':
        q.push(
          form.elements[i].name +
            ':' +
            form.elements[i].value
        );
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            o[form.elements[i].name] = form.elements[i].value;
            q.push(form.elements[i].name + ':' + form.elements[i].value);
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(
                  form.elements[i].name +
                    ':' +
                    form.elements[i].options[j].value
                );
              }
            }
            break;
          default:
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q.push(
              form.elements[i].name +
                ':' +
                form.elements[i].value
            );
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
  //data = q.join('&');
  return o;
}