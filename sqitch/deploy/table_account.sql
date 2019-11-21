-- Deploy maevsi:table_account to pg
-- requires: schema_private
-- requires: table_contact
-- requires: extension_pgcrypto
-- requires: extension_uuid-ossp

BEGIN;

-- TODO: profile picture
CREATE TABLE maevsi_private.account (
    "id"                            SERIAL PRIMARY KEY,
    "contact_id"                    INTEGER REFERENCES maevsi.contact("id") UNIQUE NOT NULL,
    "username"                      TEXT NOT NULL CHECK (char_length("username") < 100) UNIQUE,
    "e-mail_address"                TEXT NOT NULL CHECK (char_length("e-mail_address") < 320 AND "e-mail_address" ~* '^.+@.+\..+$') UNIQUE,
    "e-mail_address_verification"   UUID DEFAULT uuid_generate_v1mc(),
    "password_hash"                 TEXT NOT NULL,
    "last_activity"                 TIMESTAMP NOT NULL
);

COMMENT ON TABLE maevsi_private.account IS 'Account data.';
COMMENT ON COLUMN maevsi_private.account.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi_private.account.contact_id IS 'A reference to the account''s contact.';
COMMENT ON COLUMN maevsi_private.account.username IS 'The account''s username.';
COMMENT ON COLUMN maevsi_private.account."e-mail_address" IS 'The account''s e-mail address for account related information.';
COMMENT ON COLUMN maevsi_private.account."e-mail_address_verification" IS 'The UUID that is used to verify an e-mail address, or null if already verified.';
COMMENT ON COLUMN maevsi_private.account.password_hash IS 'The account''s password, hashed and salted.';
COMMENT ON COLUMN maevsi_private.account.last_activity IS 'Timestamp at which the account was last active.';

COMMIT;