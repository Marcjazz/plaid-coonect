import { useCallback } from 'react'
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link'

export default function Plaid({
  setIsSubmitting,
  plaidPublicToken,
  setPlaidMetadata,
}: {
  plaidPublicToken: string
  setIsSubmitting: (val: boolean) => void
  setPlaidMetadata: (
    val: PlaidLinkOnSuccessMetadata & { public_token: string }
  ) => void
}) {
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log({ metadata })
      setIsSubmitting(false)
      setPlaidMetadata({ ...metadata, public_token })
      // log and save metadata
      // exchange public token
      // fetch('http://localhost:5000/api/accounts/new-external-account', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: {
      //     public_token,
      //     plaid_account_id: id,
      //     plaid_account_mask: mask,
      //   } as unknown as Blob,
      // })
    },
    [setIsSubmitting, setPlaidMetadata]
  )

  // The usePlaidLink hook manages Plaid Link creation
  // It does not return a destroy function;
  // instead, on unmount it automatically destroys the Link instance
  const config: PlaidLinkOptions = {
    onSuccess,
    onExit: (err, metadata) => {
      console.log({ err, metadata })
    },
    token: plaidPublicToken,
  }

  const { open, ready } = usePlaidLink(config)

  if (ready) {
    open()
  }

  return <></>
}
