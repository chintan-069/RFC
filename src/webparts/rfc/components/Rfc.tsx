/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
// import styles from './Rfc.module.scss';
import { PrimaryButton } from '@fluentui/react';
import Registration from '../../components/Registration';
import I_9 from '../../components/I_9';
import Policy from '../../components/Policy';
import WI4 from '../../components/WI4';
// import WI4 from '../../components/WI4';
// import Policy from '../../components/Policy';

const Rfc = (props: any) => {


  const [currentStep, setCurrentStep] = React.useState<number>(0);


  // const get = async () => {
  //   // const items: any[] = await props._sp.web.lists.getByTitle("Student").items();
  //   const items: any[] = await props._sp.web.lists.getByTitle("Feedbck_List").items();

  //   console.log(items);
  // }
  // // console.log(typeof(props._sp));


  // React.useEffect(() => {
  //   get().catch(err => console.log(err));
  //   // post().catch(err => console.log(err));
  //   // updateItem().catch((err: any) => console.log(err))
  // }, []);

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);

  };

  const handlePreviousClick = () => {
    setCurrentStep(currentStep - 1);
  }

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <><Registration onNext={handleNextClick} _sp={props._sp} sp={props.sp}  listname={props.description}/> </>;
      case 1:
        return <WI4 onNext={handleNextClick} onPrevious={handlePreviousClick} context={props.context} _sp={props._sp} />;
      case 2:
        return <I_9 onNext={handleNextClick} onPrevious={handlePreviousClick} context={props.context} _sp={props._sp} />;
      case 3:
        return <Policy onPrevious={handlePreviousClick} onNext={handleNextClick} context={props.context} _sp={props._sp} />;
      // case 4:
      // return <Thankyou />;

      default:
        return null;
    }
  };

  const isButtonEnabled = (step: number) => {
    return currentStep === step;
  };


  return (
    <section>

      <div>
        <div style={{ gap: 3 }}>

          <PrimaryButton style={{ margin: 2 }} disabled={!isButtonEnabled(0)} onClick={() => setCurrentStep(0)}>Registration</PrimaryButton>
          <PrimaryButton style={{ margin: 2 }} disabled={!isButtonEnabled(1)} onClick={() => setCurrentStep(1)}>WI-4</PrimaryButton>
          <PrimaryButton style={{ margin: 2 }} disabled={!isButtonEnabled(2)} onClick={() => setCurrentStep(2)}>I-9</PrimaryButton>
          <PrimaryButton style={{ margin: 2 }} disabled={!isButtonEnabled(3)} onClick={() => setCurrentStep(3)}>Policy</PrimaryButton>
        </div>

        <div>
          <div style={{ marginTop: '4em' }}>
            {renderContent()}
          </div>


        </div>
      </div>
    </section>
  );
}

export default Rfc
