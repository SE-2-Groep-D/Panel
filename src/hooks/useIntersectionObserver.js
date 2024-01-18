import { useInView } from 'react-intersection-observer';

const useIntersectionObserver = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    return [ref, inView];
};

export {useIntersectionObserver};