/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {ScreenWrapper} from '../../../styles/style';
import {rpx} from '../../../styles/styleUtils';
import DeleteIcon from '../../assets/images/svgImages/deleteIcon';
import EditIcon from '../../assets/images/svgImages/editIcon';
import ModalBox from '../../components/modalBox';
import {TOAST_MESSAGE_TYPE} from '../../constants/utils';
import {strings} from '../../localization';
import {
  useDeleteDesignatedContactsMutation,
  useGetDesignatedContactsMutation,
} from '../../redux/api/designatedContactsApi';
import {INavigation} from '../../types/utils';
import {showServerError, showToastMessage} from '../../utils';
import AddDesignatedContact from '../addDesignatedContacts';
import {
  AddNewButton,
  AddNewText,
  ButtonTouchable,
  ButtonWrapper,
  ListContainer,
  ListEmailText,
  ListItemContainer,
  ListItemTopContainer,
  ListNameText,
  ListText,
} from './styled';

const myGlobal: any = global;

/**
 * Name: Props
 * Desc: Props type declaration
 */
interface Props {
  navigation?: INavigation;
}

/**
 * Name: DesignatedContacts screen
 * Desc: Screen to render Designated Contacts UI
 * @returns JSX element
 */
const DesignatedContacts = (props: Props) => {
  const {navigation} = props;
  const {designatedContacts, addNew} = strings;
  const [listData, setListData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [editData, setEditData] = useState<any>({});

  /**
   * Name: API call
   * Desc: Designated contacts list Mutation call
   */
  const [
    getDesignatedContacts,
    {
      isLoading: isContactsLoading,
      isError: isContactsError,
      error: contactsError,
      isSuccess: contactsSuccess,
      data: contactsData,
    },
  ] = useGetDesignatedContactsMutation();

  /**
   * Name: API call
   * Desc: Delete Designated contacts Mutation call
   */
  const [
    deleteDesignatedContacts,
    {
      isLoading: isDeleteContactsLoading,
      isError: isDeleteContactsError,
      error: deleteContactsError,
      isSuccess: deleteContactsSuccess,
      data: deleteContactsData,
    },
  ] = useDeleteDesignatedContactsMutation();

  /**
   * Name: useEffect
   * Desc: useEffect to handle call designated contacts
   */
  useEffect(() => {
    getDesignatedContacts('');
  }, []);

  /**
   * Name: useEffect
   * Desc: useEffect to handle get designated contacts
   */
  useEffect(() => {
    if (contactsSuccess) {
      if (contactsData && contactsData?.status) {
        setListData(contactsData?.designated_contacts);
      } else {
        showToastMessage(
          strings.lyfePlum,
          contactsData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isContactsError) {
      showServerError(contactsError, navigation);
    }
  }, [isContactsLoading]);

  /**
   * Name: useEffect
   * Desc: useEffect to handle delete designated contact
   */
  useEffect(() => {
    if (deleteContactsSuccess) {
      if (deleteContactsData && deleteContactsData?.status) {
        showToastMessage(
          strings.lyfePlum,
          deleteContactsData?.message,
          TOAST_MESSAGE_TYPE.success,
        );
        getDesignatedContacts('');
      } else {
        showToastMessage(
          strings.lyfePlum,
          deleteContactsData?.message,
          TOAST_MESSAGE_TYPE.error,
        );
      }
    }
    if (isDeleteContactsError) {
      showServerError(deleteContactsError, navigation);
    }
  }, [isDeleteContactsLoading]);

  /**
   * Name: callUpdateAction
   * Desc: Function to update designated contact.
   * @param {Object} item - The contact data
   */
  const callUpdateAction = item => {
    setEditData(item);
    myGlobal.modalType = strings.updateContactLabel;
    setModalState(true);
  };
  /**
   * Name: callDeleteAction
   * Desc: Function to delete designated contact.
   * @param {Object} item - The contact data
   */
  const callDeleteAction = item => {
    setEditData(item);
    setAlertModal(true);
  };

  /**
   * Name: deleteContact
   * Desc: Function to delete designated contact
   */
  const deleteContact = async () => {
    setAlertModal(false);
    deleteDesignatedContacts(editData?.id);
  };

  /**
   * Name: renderItem
   * Desc: Function to render contact list.
   * @param item - The contact data.
   * @returns JSX.Element.
   */
  const renderItem = ({item}) => (
    <ListItemContainer>
      <ListItemTopContainer>
        <ListNameText
          numberOfLines={
            2
          }>{`${item.first_name} ${item.last_name}`}</ListNameText>
        <ListEmailText>{item.email}</ListEmailText>
      </ListItemTopContainer>
      <ButtonWrapper>
        <ButtonTouchable
          onPress={() => callUpdateAction(item)}
          isLeftBorder={false}
          isRightBorder={true}>
          <EditIcon width={rpx(28)} height={rpx(28)} />
        </ButtonTouchable>
        <ButtonTouchable
          onPress={() => callDeleteAction(item)}
          isLeftBorder={true}
          isRightBorder={false}>
          <DeleteIcon />
        </ButtonTouchable>
      </ButtonWrapper>
    </ListItemContainer>
  );

  return (
    <ScreenWrapper>
      <ListContainer>
        <ListText>{designatedContacts}</ListText>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <AddNewButton
          onPress={() => {
            setModalState(true);
            myGlobal.modalType = strings.addContactLabel;
          }}>
          <AddNewText>{addNew}</AddNewText>
        </AddNewButton>
      </ListContainer>
      <AddDesignatedContact
        visible={modalState}
        closeModal={() => {
          setModalState(false);
          myGlobal.modalType = '';
          setEditData({});
        }}
        onSubmit={() => {
          getDesignatedContacts('');
          setModalState(false);
          myGlobal.modalType = '';
          setEditData({});
        }}
        modalType={myGlobal.modalType}
        data={editData}
      />
      <ModalBox
        visible={alertModal}
        message={strings.deleteMessage}
        onPressPositiveBtn={deleteContact}
        onPressNegativeBtn={() => setAlertModal(false)}
      />
    </ScreenWrapper>
  );
};

export default DesignatedContacts;
