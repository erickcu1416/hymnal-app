import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Colors } from 'react-native-ui-lib';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: Colors.tertiary, width: '92%' }}
      text1Style={{
        fontFamily: 'AvenirNextCyr-Bold'
      }}
      text2Style={{
        fontFamily: 'AvenirNextCyr-Regular'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'red', width: '92%'}}
      text1Style={{
        fontFamily: 'AvenirNextCyr-Bold'
      }}
      text2Style={{
        fontFamily: 'AvenirNextCyr-Regular'
      }}
    />
  ),
};

export default toastConfig;