<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div class="mb-4">
      {{ $t('greetingQuestion') }}
      <br />
      {{ $t('greetingRequest') }}
    </div>
    <Form
      :function-submit="redeem"
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    >
      <FormInput
        :error="$v.form['invitation-code'].$error"
        :title="'Invitation Code'"
      >
        <input
          id="input-invitation-code"
          v-model.trim="$v.form['invitation-code'].$model"
          class="form-input"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
        <div slot="formError">
          <FormError
            :text="'required'"
            :validation-object="$v.form['invitation-code']"
            :validation-property="'required'"
          />
          <FormError
            :text="'invalid format'"
            :validation-object="$v.form['invitation-code']"
            :validation-property="'uuid'"
          />
        </div>
      </FormInput>
      <div class="flex flex-col items-center justify-between">
        <Button
          :disabled="
            !(
              $v.form['invitation-code'].$dirty &&
              !$v.form['invitation-code'].$error
            )
          "
          :icon="false"
          type="submit"
        >
          {{ $t('title') }}
        </Button>
      </div>
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="$v.form['invitation-code']"
        class="mt-4"
      />
    </Form>
  </div>
</template>

<script>
import { helpers, required } from 'vuelidate/lib/validators'

import REDEEM_MUTATION from '~/gql/mutation/redeem'

const consola = require('consola')

const uuid = helpers.regex(
  'uuid',
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
)

export default {
  data() {
    return {
      form: {
        'invitation-code':
          this.$route.query.ic === undefined ? undefined : this.$route.query.ic,
      },
      graphqlErrorMessage: undefined,
      title: this.$t('title'),
    }
  },
  created() {
    if (this.$route.query.ic !== undefined) {
      this.$v.form['invitation-code'].$touch()
    }
  },
  methods: {
    async redeem(e) {
      e.preventDefault()

      this.graphqlErrorMessage = undefined

      this.$v.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: REDEEM_MUTATION,
          variables: {
            invitationCode: this.form['invitation-code'],
          },
        })
        .then(({ data }) =>
          this.$global.checkNested(data, 'redeem', 'redeemResponse')
        )
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })

      if (!res) {
        return
      }

      this.$global.storeJwt(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt,
        this.$router.push(
          this.localePath(`/event/${res.organizerUsername}/${res.eventSlug}`)
        )
      )
    },
  },
  head() {
    return { title: this.title }
  },
  validations: {
    form: {
      'invitation-code': {
        required,
        uuid,
      },
    },
  },
}
</script>

<i18n lang="yml">
de:
  greetingQuestion: 'Hast du einen Einladungscode für eine Veranstaltung erhalten?'
  greetingRequest: 'Gib ihn hier ein!'
  title: 'Einlösen'
en:
  greetingQuestion: 'Did you receive an invitation code for an event?'
  greetingRequest: 'Enter it here!'
  title: 'Redeem' # This property is currently used for the title and the button.
</i18n>
