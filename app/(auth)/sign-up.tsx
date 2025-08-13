import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  
  const [verification, setVerification] = useState({
    state: "default", // can be 'default', 'pending', 'success', or 'failed'
    error: "",
    code: "",
  });
  const [code, setCode] = useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        //firstName: form.name,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      //console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {

          await fetchAPI('/(api)/user',  {
            method: "POST",
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              clerkId: signUpAttempt.createdUserId,
            }),
          });

        //create a  database user

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
          error: "Verification Failed",
        });
        // router.replace("/");
      } else {
        setVerification({ ...verification, state: "failed" });
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0]?.longMessage,
        state: "failed",
      });
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  // if (verification.state === "pending") {
  //   return (
  //     <>
  //       <Text>Verify your email</Text>
  //       <TextInput
  //         value={code}
  //         placeholder="Enter your verification code"
  //         onChangeText={(code) => setCode(code)}
  //       />
  //       <TouchableOpacity onPress={onVerifyPress}>
  //         <Text>Verify</Text>
  //       </TouchableOpacity>
  //     </>
  //   );
  // }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          </View>
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account 👇
          </Text>
        </View>
        <View>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons?.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          ></InputField>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons?.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          ></InputField>
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons?.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          ></InputField>
          <InputField
            label="Confirm Password"
            placeholder="Confirm Password"
            icon={icons?.lock}
            secureTextEntry={true}
            value={form.confirmPassword}
            onChangeText={(value) =>
              setForm({ ...form, confirmPassword: value })
            }
          ></InputField>
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
        </View>

        {/*OAuth*/}
        <OAuth />

        <View className="mt-2 mb-10">
          <Text className="text-xl mt-4 text-center base-regular text-black ">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-lg text-primary-500 font-JakartaSemiBold"
            >
              Sign In
            </Link>
          </Text>
        </View>

        {/* Verifica */}

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") {
              setShowSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-3">
              We`ve sent a verification code to {form.email}.
            </Text>
            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-primary-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images?.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                router.push(`/(root)/(tabs)/home` as any);
              }}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
