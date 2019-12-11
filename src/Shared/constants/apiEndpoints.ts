export const CREATE_TEMP_PROFILE_ENDPOINT = '/tempProfiles';
export const INVITATION_MEMBER_ENDPOINT = '/members/invitations/{id}';
export const EXIST_EMAIL_ENDPOINT = '/users/emails/{email}';
export const GET_TEAM_MEMBERS_ENDPOINT = '/companies/{companyId}/members';
export const SET_STATUS_MEMBERS_ENDPOINT =
  '/companies/{companyId}/members/{memberId}/status';
export const SET_ROLE_MEMBERS_ENDPOINT =
  '/companies/{companyId}/members/{memberId}/role';
export const RESEND_INVITE_MEMBERS_ENDPOINT =
  '/companies/{companyId}/invitations/{memberId}/resend';
export const GET_DETAIL_MEMBERS_ENDPOINT =
  '/companies/{companyId}/members/{memberId}';
export const SET_PASSWORD_MEMBERS_ENDPOINT =
  '/companies/{companyId}/members/{memberId}/pwd';
export const UPDATE_PROFILE_MEMBERS_ENDPOINT =
  '/companies/{companyId}/members/{memberId}/profile';
export const GET_PROFILE = '/me';
export const RESEND_MEMBER_INVITATION_ENDPOINT =
  '/companies/{companyId}/members/invite';
