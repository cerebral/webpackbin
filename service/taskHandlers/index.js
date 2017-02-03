const check_notifications = require('./check_notifications');
const create_post = require('./create_post');
const create_post_comment = require('./create_post_comment');
const create_profile = require('./create_profile');
const join_challenge = require('./join_challenge');
const remove_profile_image = require('./remove_profile_image');
const reply_organization_invitation = require('./reply_organization_invitation');
const send_feedback_email = require('./send_feedback_email');
const toggle_logged_activity = require('./toggle_logged_activity');
const update_profile = require('./update_profile');
const toggle_favourite_activity = require('./toggle_favourite_activity');
const toggle_habit_activity = require('./toggle_habit_activity');
const delete_account = require('./delete_account');

module.exports = [
  {
    specId: 'create_post',
    numWorkers: 100,
    tree: create_post
  },
  {
    specId: 'create_post_comment',
    numWorkers: 100,
    tree: create_post_comment
  },
  {
    specId: 'toggle_logged_activity',
    numWorkers: 100,
    tree: toggle_logged_activity
  },
  {
    specId: 'create_profile',
    numWorkers: 100,
    tree: create_profile
  },
  {
    specId: 'update_profile',
    numWorkers: 100,
    tree: update_profile
  },
  {
    specId: 'remove_profile_image',
    numWorkers: 100,
    tree: remove_profile_image
  },
  {
    specId: 'join_challenge',
    numWorkers: 100,
    tree: join_challenge
  },
  {
    specId: 'check_notifications',
    numWorkers: 100,
    tree: check_notifications
  },
  {
    specId: 'reply_organization_invitation',
    numWorkers: 100,
    tree: reply_organization_invitation
  },
  {
    specId: 'send_feedback_email',
    numWorkers: 100,
    tree: send_feedback_email
  },
  {
    specId: 'toggle_favourite_activity',
    numWorkers: 100,
    tree: toggle_favourite_activity
  },
  {
    specId: 'toggle_habit_activity',
    numWorkers: 100,
    tree: toggle_habit_activity
  },
  {
    specId: 'delete_account',
    numWorkers: 100,
    tree: delete_account
  }
];
