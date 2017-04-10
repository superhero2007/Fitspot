import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import {FONT_DAYTONA_BOLD, FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: null
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 13,
    color: 'white',
    marginBottom: 15,
    fontFamily: FONT_DAYTONA_BOLD
  },
  description: {
    fontFamily: 'System',
    fontSize: 11,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    maxWidth: 200,
    textAlign: 'center'
  },
  separator: {
    height: 10,
    backgroundColor: '#dddddd',
    marginLeft: 32,
    marginRight: 32
  },
  logoImage: {
    marginTop: 0,
    width: 164,
    height: 100,
  },
  clientButton: {
    height: 50,
    // width: 256,
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row',
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf:'stretch',
    marginTop:10,
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 10,
    marginLeft: 32,
    marginRight: 32
  },
  textInput: {
    height: 20,
    width: 250,
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 14,
  },
  facebookButton: {
    height: 50,
    width: null,
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row',
    backgroundColor: '#3B5998',
    borderColor: '#3B5998',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf:'stretch',
    marginTop: 0
  },
  okText: {
    fontFamily: 'System',
    fontSize: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    marginTop: 10,
    textAlign: 'center'
  },
  headingText: {
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 8,
    letterSpacing: .1,
    // backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    marginTop: 16,
    opacity: .5,
  },
  errorText: {
    fontFamily: FONT_DAYTONA_REG,
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'red',
    marginTop: 12,
    textAlign: 'center'
  },
  forgotPWLink: {
    fontFamily: 'System',
    fontWeight: 'bold',
    color: DEFAULT_GREEN_COLOR,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    marginBottom: 10,
    textAlign: 'center',
    fontSize:12,
  },
  registerButton: {
    height: 50,
    width: null,
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    // marginTop: 25
  },
  registerButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  bookButtonStyle: {
    width: null,
    marginLeft:32,
    marginRight:32,
    marginBottom: 24,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    height: 50,
    justifyContent: 'center'
  },
  bookButtonTextStyle: {
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

export default styles
