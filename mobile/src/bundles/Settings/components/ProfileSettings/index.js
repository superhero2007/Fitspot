import React from 'react'
import { NativeModules } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { TextInput,View, ListView, StyleSheet, Text, ScrollView, Image,Linking,Alert} from 'react-native';
import styles from './styles'
import { connect } from 'react-redux'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'
import { availabilityResetState } from '@store/modules/availability/actions'
import { chatResetState } from '@store/modules/chat/actions'
import { logout } from '@store/modules/auth/actions'
import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import CONSTS from '@utils/Consts'
import {
  Cell,
  Section,
  TableView,
} from 'react-native-tableview-simple';

// Messages
const FriendEmailSubject = "Save $20 on yoga, circuit training, and other personal training sessions with Fitspot"
const FriendEmailTemplate = "Hey, use my referral code: _ to save $20 on any of Fitspot's workouts."
const HREmailSubject = "Save 20% on first Fitspot Team Workout!"
const HREmailTemplate = "Mention my referral code: _, to receive 20% off on our first team customized workout with vetted, insured, certified personal trainers that come to you across a wide variety of activities: yoga, massage, circuit training, kickboxing, and more. Fitspot is a benefit that employees enjoy and its one that can bring corporate wellness ROI. Learn more here: www.fitspotapp.com/at-work and call for a free consultation: 415-320-6972."


const CellVariant = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingVertical: 0 }}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{fontSize:16,alignSelf:'center'}}
        >
          {props.firstText}<Text
              allowFontScaling
              numberOfLines={1}
              style={{color:'green', fontSize: 16,alignSelf:'center' }}
            >
              {props.middleText}</Text>{props.lastText}
        </Text>
      </View>
    }
  />
);
const CellVariantCenter = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={{flexDirection: 'row', flex: 1, paddingVertical: 10,alignItems: 'center',justifyContent:'center'}}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{fontSize:16,alignSelf:'center'}}
        >
          {props.firstText}
        </Text>
      </View>
    }
  />
);

const CustomCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View
        style={{flexDirection: 'row', flex: 1, paddingVertical: 10,alignItems: 'center'}}
      >
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{fontSize:16,alignSelf:'center'}}
        >
          {props.title}
        </Text>
      </View>
    }
  />
);





const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,AccessToken,LoginManager
} = FBSDK;

import PaymentHistory from './paymentHistory'


type Props = {
  logoutClick: Function,
  user: Object,
  brainTreeToken: String,
  workoutInfo: Object,
  getPayoutInfo: Function,
  payoutItems: Array,
}

class Profile extends React.Component{

  constructor(props) {
    console.log("data : "+JSON.stringify(props));
      super(props);
      this.state = {
        showPayment: true,
      }
    }

  async setupCreditCard(){
    var BrainTreePayManager = NativeModules.BrainTreePayManager;
        var token = await BrainTreePayManager.showDropIn(this.props.brainTreeToken);

    if(token[0] === 'error'){
      if(token[1] === 'cancelled'){
        return
      }else{
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Credit Card Setup Error',
          detailsText: token[1],
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
        return
      }
    }
  }

  showComingSoon(){
    Alert.alert(
     'Coming Soon',
     '',
     [
       {text: 'OK'},
     ],
     { cancelable: false }
   )
  }

  openURL(linkURL){
    if(linkURL !== null){
      Linking.openURL(linkURL).catch(err => console.error('An error occurred', err));
    }
  }

  mailto(subject, body) {
    return "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }
  getUserReferralCode() {
    return "123456"; // TODO get this from backend
  }

  logout(){
    LoginManager.logOut((data) =>{
    })
    this.props.logoutClick();
  }

  toggleInformation(status){
    this.setState({showPayment: status})
  }
  userTypeTrainer(){
//    this.props.setUserTypeTrainer()
    Actions.trainerAboutYou();
  }

  renderPayment(){
    var buttonCTA = 'Add Card'
    var cardInfoText = 'Add a credit card to purchase packages or single workouts.'
    if(this.props.user.lastPaymentString != null){
      cardInfoText = this.props.user.lastPaymentString
      buttonCTA = 'Change Card'
    }
if(this.props.user.userType === CONSTS.USER_TYPE.TRAINER ){
  return(
 <ScrollView>
   <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:16}}>Credit Card Information</Text>
   <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft: 32, marginRight:32,marginBottom: 28}}>
     {cardInfoText}
   </Text>
   {/*<View>*/}
   <HorizontalLine />
   <Button buttonStyle={styles.buttonStyle} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.setupCreditCard()}>
     {buttonCTA}
   </Button>
   <HorizontalLine fullWidth={true} />
     <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:25}}>Fitspot Credit</Text>
     <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft: 50,marginRight:50,marginBottom: 24, textAlign: 'center'}}>You referred 10 new users. Your next discount will be $25.</Text>
   <HorizontalLine fullWidth/>
   <Text style={{alignSelf: 'center',fontFamily:FONT_DAYTONA_BOLD,fontSize:13,marginTop:24,marginBottom:25}}>Referral Code</Text>
   <Text style={{alignSelf: 'center',fontFamily:'System',fontSize:13, marginLeft:32, marginRight: 32, textAlign: 'center', marginBottom: 24}}>Know a friend that would love Fitspot? Give them your referral code and when they sign up, youll get a cash reward!</Text>
   <Text style={{letterSpacing:3,alignSelf: 'center',fontFamily:FONT_DAYTONA_REG,fontSize:18, marginBottom: 24}}>DEBJ0466327</Text>
   <HorizontalLine fullWidth/>
     <Button buttonStyle={[styles.buttonStyle, {marginTop: 24}]} buttonTextStyle={styles.buttonTextStyle} onPress={() => this.logout()}>
       Log Out
     </Button>
     {/*<Button onPress={()=> alert('Need to Implement')} buttonStyle={[styles.buttonStyle,{opacity: this.props.user.userType === CONSTS.USER_TYPE.TRAINER ? 0 : 1}]} buttonTextStyle={styles.buttonTextStyle} onPress={Actions.chooseLocation}>
       Become a Trainer
     </Button> */}

 </ScrollView>
)
}
  else{
    return(
      <ScrollView>
      <TableView>
        <Section header="EDIT INFORMATION">
          <Cell cellStyle="Basic" title="Connect Your Wearables/Smart Scale" accessory="DisclosureIndicator" onPress={() => this.showComingSoon()} />
          <Cell cellStyle="Basic" title="Edit Credit Card Information" accessory="DisclosureIndicator" onPress={() => this.showComingSoon() } />
        </Section>

        <Section header="GIVE THE GIFT OF FIT">
          <CellVariant firstText="Refer Friends (" middleText="+$20" lastText = ")"  accessory="DisclosureIndicator" onPress={() => Linking.openURL(this.mailto(FriendEmailSubject, FriendEmailTemplate.replace(/_/,this.getUserReferralCode())))}/>
          <CellVariant firstText="Refer Your Employer(" middleText="+$100" lastText = ")"  accessory="DisclosureIndicator" onPress={() => Linking.openURL(this.mailto(HREmailSubject, HREmailTemplate.replace(/_/,this.getUserReferralCode())))}/>
          <CellVariant firstText="Buy Gift Cards (" middleText="+$20" lastText = " per -$69)"  accessory="DisclosureIndicator" onPress={() => this.openURL('https://www.fitspotapp.com/gift-cards')}/>
        </Section>

        <Section header="About">
          <Cell cellStyle="Basic" title="About Fitspot" accessory="DisclosureIndicator" onPress={() => this.openURL('https://www.fitspotapp.com/about-us')} />
          <Cell cellStyle="Basic" title="About Free Group Workouts At Work" accessory="DisclosureIndicator" onPress={() => this.openURL('https://www.fitspotapp.com/at-work/')} />
        </Section>

        <Section header="FEEDBACK">
          <Cell cellStyle="Basic" title="Rate Us" accessory="DisclosureIndicator" onPress={() =>this.openURL('https://itunes.apple.com/us/app/personal-training-on-demand-fitspot/id975404827?mt=8')}  />
          <Cell cellStyle="Basic" title="Help & Support" accessory="DisclosureIndicator" onPress={() => Linking.openURL('mailto:support@fitspotapp.com?&subject=SUPPORT&body=body')} />
        </Section>

        <Section header="LEGAL">
          <Cell cellStyle="Basic" title="Privacy Policy" accessory="DisclosureIndicator" onPress={() => this.openURL('https://www.fitspotapp.com/privacy-policy/')} />
          <Cell cellStyle="Basic" title="Terms & Conditions" accessory="DisclosureIndicator" onPress={() => this.openURL('https://www.fitspotapp.com/terms-and-conditions/')} />
        </Section>

        <Section header="">
          <CellVariantCenter firstText="Become a Fitspot Instructor" onPress={() => this.userTypeTrainer()}/>
        </Section>

        <Section header="">
          <CellVariantCenter firstText="Logout" onPress={() => this.logout()}/>
        </Section>
      </TableView>
      </ScrollView>
    )

    }
  }

  renderPaymentHistory(){
    return(
      <PaymentHistory getPayoutInfo={this.props.getPayoutInfo} payoutItems={this.props.payoutItems}/>
    )
  }


  render (){
    var trainerPadding = 6;
    return (
    <View style={{marginTop:63, marginBottom: 55}}>
      { this.props.user.userType === CONSTS.USER_TYPE.TRAINER  ?
        <View style={{flexDirection:'row',}}>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:this.state.showPayment ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:this.state.showPayment ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(true)}>
            Payment
          </Button>
          <Button buttonStyle={[styles.topButtonStyle,{borderBottomWidth:1,borderBottomColor:!this.state.showPayment ? DEFAULT_GREEN_COLOR : '#F2F2F2'}]} buttonTextStyle={[styles.topButtonTextStyle,{color:!this.state.showPayment ? DEFAULT_GREEN_COLOR : '#E8E8E8'}]} onPress={() => this.toggleInformation(false)}>
            History
          </Button>
        </View>
        :
        <View></View>
      }
        { this.state.showPayment ?
          this.renderPayment() :
          this.renderPaymentHistory()
        }

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutClick: () => {
      dispatch(chatResetState())
      dispatch(availabilityResetState())
      dispatch(logout())
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)
