import { ScrollView } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';

export default function DialogScreen() {
  return (
    <ScrollView contentContainerClassName='flex-1 justify-center items-center p-6'>
<Dialog>
  <DialogTrigger asChild>
    <Button 
      variant='secondary'
      accessibilityRole="button"
      accessibilityLabel="Edit Profile"
      accessibilityHint="Opens dialog to edit your profile"
    >
      <Text>Edit Profile</Text>
    </Button>
  </DialogTrigger>
  <DialogContent 
    className='sm:max-w-[425px]'
    accessibilityViewIsModal={true}
    accessibilityRole="dialog"
    accessibilityLabel="Edit profile dialog"
    accessibilityLiveRegion="assertive"
    nativeID="profile-dialog"
  >
    <DialogHeader>
      <DialogTitle 
        nativeID="dialog-title"
        accessibilityRole="header"
      >
        Edit profile
      </DialogTitle>
      <DialogDescription
        nativeID="dialog-description"
        accessibilityRole="text"
      >
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button
          accessibilityRole="button"
          accessibilityLabel="I accept"
          accessibilityHint="Accepts changes and closes the dialog"
        >
          <Text>I accept</Text>
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
    </ScrollView>
  );
}
