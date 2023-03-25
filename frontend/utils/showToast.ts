// * various helpers to display similar toasts faster
import { ToastContextInterface, ToastDataInterface } from 'context/toastContext';
import toast from 'react-hot-toast';
import { isUndefined } from 'lodash-es';
import { APP_REDIRECT_NETWORK, ChainNameFromNetworkName, SUPPORTED_NETWORK } from 'constants/networkNames';

// Unsupported network error message
export const showUnsupportedNetworkToast = (setToastData: ToastContextInterface['setToastData']): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'Unsupported Network',
          severity: 'error',
          primaryButtonType: 'BUTTON',
          primaryButtonText: 'DISMISS',
          buttonActionType: 'DISMISS'
        }
      } as ToastDataInterface;
    });
  }

  toast.error(
    `Your wallet is connected to the wrong network. Please switch your network to ${ChainNameFromNetworkName[SUPPORTED_NETWORK]}`,
    { id }
  );
};

// Metamask not installed warning message
export const showMetamaskInstallationToast = (setToastData: ToastContextInterface['setToastData']): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'MetaMask Not Found',
          severity: 'warning',
          primaryButtonType: 'ANCHOR',
          primaryButtonText: 'TAKE ME THERE',
          linkType: 'EXTERNAL',
          link: 'https://metamask.app.link/dapp/unreal.finance/'
        }
      } as ToastDataInterface;
    });
  }

  toast('Please add MetaMask extension to use this Application', { id });
};

// User rejected request error message
export const showUserRejectedRequestToast = (setToastData: ToastContextInterface['setToastData']): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'Login and Authorize Your Wallet',
          severity: 'info'
        }
      } as ToastDataInterface;
    });
  }

  toast('Please login and authorize access to your account to continue', { id });
};

// Aleeady processing request error message
export const showAlreadyProcessingRequestToast = (setToastData: ToastContextInterface['setToastData']): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'Login and Authorize Your Wallet',
          severity: 'error',
          primaryButtonType: 'BUTTON',
          primaryButtonText: 'DISMISS',
          buttonActionType: 'DISMISS'
        }
      } as ToastDataInterface;
    });
  }

  toast.error('Already processing MetaMask connection request. Please login using the MetaMask icon to continue', {
    id
  });
};

export const showRedirectNetworkToast = (setToastData: ToastContextInterface['setToastData']): void => {
  // * toast message
  const id = crypto.randomUUID();
  const link = process.env.NEXT_PUBLIC_APP_REDIRECT_URL;
  const duration = 5000;

  const timeoutID = setTimeout(() => {
    window.location.href = link;
  }, duration);

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: `Go to ${ChainNameFromNetworkName[APP_REDIRECT_NETWORK]} App?`,
          severity: 'warning',
          primaryButtonType: 'ANCHOR',
          primaryButtonText: 'YES',
          linkType: 'INTERNAL',
          link,
          secondaryButtonType: 'BUTTON',
          secondaryButtonText: 'NO',
          buttonActionType: 'DISMISS',
          timeoutID
        }
      } as ToastDataInterface;
    });
  }

  toast('You will be auto-redirected in 5 seconds', { id, duration });
};

export const showNewBucketSuccess = (setToastData: ToastContextInterface['setToastData'], bucketName: string): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'Success',
          severity: 'success',
          primaryButtonType: 'ANCHOR',
          primaryButtonText: 'VIEW BUCKETS',
          linkType: 'INTERNAL',
          link: '/'
        }
      } as ToastDataInterface;
    });
  }

  toast.success(`Bucket '${bucketName}' created successfully!`, { id });
};

export const showNewBucketError = (setToastData: ToastContextInterface['setToastData'], errorMessage: string): void => {
  // * toast message
  const id = crypto.randomUUID();

  if (!isUndefined(setToastData)) {
    setToastData((prevContext) => {
      // object that we want to update
      return {
        // keep all other key-value pairs
        ...(prevContext || {}),
        [id]: {
          title: 'An error occurred',
          severity: 'error'
        }
      } as ToastDataInterface;
    });
  }

  toast.error(errorMessage, { id });
};
