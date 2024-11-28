import { signIn } from "@/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("keycloak")
      }}
    >
      <button type="submit" className="button">Signin</button>
    </form>
  )
} 