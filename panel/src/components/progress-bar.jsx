export default function ProgressBar({onClick, step, maxStep}) {
    const steps = [];

        for(let i = 0; i < maxStep; i++) {
            steps.push(
                <span key={i} className={(step > i) ? 'stage active' : 'stage'}></span>
            );
        }

  


  return (
    <progress-bar onClick={onClick}> {steps.map((item, key) => {
        return item;
    })} </progress-bar>
  );
}

