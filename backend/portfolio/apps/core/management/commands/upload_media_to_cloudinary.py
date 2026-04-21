import cloudinary
import cloudinary.uploader
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from portfolio.apps.core.models import Profile

CV_PUBLIC_ID = 'media/cv/seydna_aly_cv.pdf'


class Command(BaseCommand):
    help = 'Upload local media files to Cloudinary storage'

    def handle(self, *args, **options):
        profile = Profile.objects.first()
        if not profile:
            self.stdout.write(self.style.ERROR('No profile found.'))
            return

        media_root = settings.MEDIA_ROOT

        # Upload photo using Django storage (preserves existing if already uploaded)
        local_photo = media_root / 'profile' / 'Seydna.jpeg'
        if local_photo.exists():
            with open(local_photo, 'rb') as f:
                profile.photo.save('Seydna.jpeg', File(f), save=True)
            self.stdout.write(self.style.SUCCESS(f'Photo uploaded: {profile.photo.url}'))
        else:
            self.stdout.write(self.style.WARNING(f'Photo not found at {local_photo}'))

        # Upload CV directly via Cloudinary SDK with explicit public access
        local_cv = media_root / 'cv' / 'seydna_aly_cv.pdf'
        if local_cv.exists():
            result = cloudinary.uploader.upload(
                str(local_cv),
                public_id=CV_PUBLIC_ID,
                resource_type='raw',
                access_mode='public',
                overwrite=True,
            )
            cv_secure_url = result.get('secure_url', '')
            # Store just the path portion so RawMediaCloudinaryStorage can serve it
            Profile.objects.filter(pk=profile.pk).update(cv_file=CV_PUBLIC_ID)
            self.stdout.write(self.style.SUCCESS(f'CV uploaded: {cv_secure_url}'))
        else:
            self.stdout.write(self.style.WARNING(f'CV not found at {local_cv}'))

        self.stdout.write(self.style.SUCCESS('Done.'))
