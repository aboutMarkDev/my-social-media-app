import { toast } from "@/components/hooks/use-toast";
import Loader from "@/components/shared/Loader";
import ProfileAvatarUploader from "@/components/shared/ProfileAvatarUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetUserById,
  useUpdateUser,
} from "@/lib/react-query/queriesAndMutations";
import { ProfileValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateProfile() {
  const { id } = useParams();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      bio: user.bio || "",
    },
  });

  const { data: userProfile } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isUpdateLoading } =
    useUpdateUser();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    const updatedUser = await updateUser({
      userId: userProfile?.$id || "",
      name: values.name,
      bio: values.bio,
      file: values.file,
      imageURL: userProfile?.imageURL,
      imageID: userProfile?.imageID,
    });

    if (!updatedUser) {
      toast({ title: "Updating user has failed. Please try again" });
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageURL,
    });
    return navigate(`/profile/${id}`);
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-1 justify-start w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-9 w-full max-w-5xl"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileAvatarUploader
                      fieldChange={field.onChange}
                      mediaUrl={userProfile?.imageURL}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      placeholder="Describe yourself..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="bg-dark-4 px-5 h-[38px]"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isUpdateLoading}
              >
                {isUpdateLoading ? (
                  <div className="flex-center gap-2">
                    <Loader /> Loading...
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProfile;
