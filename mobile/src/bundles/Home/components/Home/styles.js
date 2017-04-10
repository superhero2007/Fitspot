
import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT,FONT_DAYTONA_REG } from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: null,
    marginBottom: 55,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoStyle: {
    marginTop: 34,
  },
  headerText: {
    fontFamily: FONT_DAYTONA_LIGHT,
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft:32,
    marginRight:32,
    color: '#4c4c4c',
    textAlign: 'center',
    marginTop: 12
  },
  registerButton: {
    height: 50,
    alignSelf: 'stretch',
    marginLeft:32,
    marginRight:32,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 25
  },
  registerButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  bookActivityButton: {
    height: 44,
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    alignSelf: 'stretch',
    marginLeft:32,
    marginRight:32,
    // width: 256,
    justifyContent: 'center'
  },
  bookActivityButtonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  workoutListButton: {
    height: 50,
    flex:1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomColor: DEFAULT_GREEN_COLOR,
    borderBottomWidth: 2,
    justifyContent: 'center',

  },
  requestNumberTextStyle:{
    fontSize: 12,
    color: '#E67650',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  workoutRow: {
    alignSelf: 'stretch',
  }
})

export default styles
