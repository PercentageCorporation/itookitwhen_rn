import React, { useState, createContext } from 'react'

export const CreateMedContext = createContext();

export function CreateProvider(props) {
    const[step, setStep] = useState(1);
    const[maxStep, setMaxStep] = useState(1);
    const[newMed, setNewMed] = useState(
      {
        Id: 0,
        Name: 'ATENOLOL',
        Brand: 'ATENOLOL',
        Form: 'TABLET',
        Strength: '100MG',
        Often: 'daily',
        OftenCode: 'D1',
        Dosage: 1,
        Schedule: ['08:00AM'],
        Occurance: 1,
      });

    console.log('CreateProvider');
    const is = {
            Id: 0,
            Name: '',
            Brand: '',
            Form: '',
            Strength: '',
            Often: '',
            OftenCode: '',
            Dosage: 1,
            Schedule: [],
            Occurance: 0,
        };

    var cs = {
        step: step,
        maxStep: maxStep,
        next: nextStep,
        prev: prevStep,
        set: setMed,
        reset: resetMed,
    };

    function resetMed() {
      console.log('resetMed');
      setNewMed(is);
      setStep(1);
      setMaxStep(1);
    }
  
    function setMed(field, value) {
    console.log('setMed', field, value);
    var med = newMed;
    med[field] = value;
    setNewMed(med);
    console.log('setNewMed', med);
  }

  function nextStep() {
      let ns = step;
      if (step === 5 )
        ns = (newMed.Often === 'Hourly') ? 7 : 6;
      else if (step === 6)
        ns = 8;
      else
        ns = step + 1;

      setStep(ns);
      const nms = ns>maxStep ? ns : maxStep; 
      setMaxStep(nms);
      console.log('nextStep', ns);
  }

  function prevStep() {
    let ns = step > 1 ? step - 1 : step;
    if (step === 8)
      ns = (newMed.Often === 'Hourly') ? 7 : 6;
    setStep(ns);
    console.log('prevStep', ns);
}

return (
      <CreateMedContext.Provider value={{cs,newMed}}>
          {props.children}
      </CreateMedContext.Provider>
  )
}

