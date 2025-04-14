import { View } from 'react-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function AlertDialogScreen() {
  return (
    <View className='items-center justify-center flex-1'>
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button 
      variant='secondary'
      accessibilityRole="button"
      accessibilityLabel="Show Alert Dialog"
      accessibilityHint="Opens a confirmation dialog about deleting your account"
    >
      <Text>Show Alert Dialog</Text>
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent
    accessibilityViewIsModal={true}
    accessibilityRole="alertdialog"
    accessibilityLabel="Account deletion confirmation"
    accessibilityLiveRegion="assertive"
    nativeID="alert-dialog"
  >
    <AlertDialogHeader>
      <AlertDialogTitle
        nativeID="alert-dialog-title"
        accessibilityRole="header"
      >
        Are you absolutely sure?
      </AlertDialogTitle>
      <AlertDialogDescription
        nativeID="alert-dialog-description"
        accessibilityRole="text"
      >
        This action cannot be undone. This will permanently delete your account and remove
        your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        accessibilityHint="Cancels account deletion and closes the dialog"
      >
        <Text>Cancel</Text>
      </AlertDialogCancel>
      <AlertDialogAction
        accessibilityRole="button"
        accessibilityLabel="Continue with deletion"
        accessibilityHint="Permanently deletes your account"
        accessibilityState={{ busy: false, disabled: false }}
      >
        <Text>Continue</Text>
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </View>
  );
}
