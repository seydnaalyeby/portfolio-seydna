import cloudinary.uploader
from django.core.management.base import BaseCommand
from django.conf import settings
from portfolio.apps.core.models import Profile


class Command(BaseCommand):
    help = 'Upload local media files to Cloudinary storage'

    def handle(self, *args, **options):
        profile = Profile.objects.first()
        if not profile:
            self.stdout.write(self.style.ERROR('No profile found.'))
            return

        media_root = settings.MEDIA_ROOT

        # Upload photo as image type
        local_photo = media_root / 'profile' / 'Seydna.jpeg'
        if local_photo.exists():
            result = cloudinary.uploader.upload(
                str(local_photo),
                public_id='portfolio/profile/seydna',
                resource_type='image',
                overwrite=True,
            )
            profile.photo = result['public_id']
            self.stdout.write(self.style.SUCCESS(f'Photo uploaded: {result["secure_url"]}'))
        else:
            self.stdout.write(self.style.WARNING(f'Photo not found at {local_photo}'))

        # Upload CV as raw type (required for PDFs)
        local_cv = media_root / 'cv' / 'seydna_aly_cv.pdf'
        if local_cv.exists():
            result = cloudinary.uploader.upload(
                str(local_cv),
                public_id='portfolio/cv/seydna_aly_cv',
                resource_type='raw',
                overwrite=True,
            )
            profile.cv_file = result['public_id']
            self.stdout.write(self.style.SUCCESS(f'CV uploaded: {result["secure_url"]}'))
        else:
            self.stdout.write(self.style.WARNING(f'CV not found at {local_cv}'))

        profile.save()
        self.stdout.write(self.style.SUCCESS('Done.'))
