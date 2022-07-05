import axios from 'axios';

const BASE_URL = "http://localhost:8080";

function buildHeadersWithToken(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
}

export function getUserRequest(userId, token) {
    return axios.get(`${BASE_URL}/user/${userId}`, buildHeadersWithToken(token));
}

export function getOffers() {
    return axios.get(`${BASE_URL}/offer/`);
}

export function getOfferById(offerId) {
    return axios.get(`${BASE_URL}/offer/${offerId}`);
}

export function getOffersByUserId(userId, token) {
    return axios.get(`${BASE_URL}/offer/user/${userId}`, buildHeadersWithToken(token));
}

export function getReservationsByUserId(userId, token) {
    return axios.get(`${BASE_URL}/reservation/user/${userId}`, buildHeadersWithToken(token));
}

export function getReservationsByOfferId(offerId, token) {
    return axios.get(`${BASE_URL}/reservation/offer/${offerId}`, buildHeadersWithToken(token));
}

export function getReservationsByOfferIdAndUserId(offerId, userId, token) {
    return axios.get(`${BASE_URL}/reservation/offer/${offerId}/user/${userId}`, buildHeadersWithToken(token));
}

export function deleteReservationById(reservationId, token) {
    return axios.delete(`${BASE_URL}/reservation/${reservationId}`, buildHeadersWithToken(token));
}

export function deleteReservationsByOfferId(offerId, token) {
    return axios.delete(`${BASE_URL}/reservation/byOffer/${offerId}`, buildHeadersWithToken(token));
}

export function deleteOfferById(offerId, token) {
    return axios.delete(`${BASE_URL}/offer/${offerId}`, buildHeadersWithToken(token));
}

export function postReservation(reservationPayload, token) {
    return axios.post(`${BASE_URL}/reservation`, reservationPayload, buildHeadersWithToken(token));
}

export function postOffer(offerPayload, token) {
    return axios.post(`${BASE_URL}/offer`, offerPayload, buildHeadersWithToken(token));
}

export function logInUser(user) {
    return axios.post(`${BASE_URL}/user/logon`, user);
}

export function registerUser(user) {
    return axios.post(`${BASE_URL}/user`, user);
}

export function putReservationIsApprovedById(reservationId, shouldApprove, token) {
    return axios.put(`${BASE_URL}/reservation/${reservationId}?isApproved=${shouldApprove}`, {}, buildHeadersWithToken(token));
}