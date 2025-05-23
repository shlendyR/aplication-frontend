import React from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

const ModalVerticallyCenteredScrollableExample = ({ visible, onClose, notifications }) => {
  return (
    <CModal alignment="center" scrollable visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Notifications</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {notifications && notifications.length > 0 ? (
          <CListGroup>
            {notifications.map((notification, index) => (
              <CListGroupItem key={index}>
                {notification.type}{' '}
                <span className="badge bg-primary ms-2">{notification.count}</span>
              </CListGroupItem>
            ))}
          </CListGroup>
        ) : (
          <p>No notifications available.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalVerticallyCenteredScrollableExample
