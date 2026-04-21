import os
from django.core.management.base import BaseCommand
from django.core.files import File
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

        # Upload photo
        local_photo = media_root / 'profile' / 'Seydna.jpeg'
        if local_photo.exists():
            with open(local_photo, 'rb') as f:
                profile.photo.save('profile/Seydna.jpeg', File(f), save=False)
            self.stdout.write(self.style.SUCCESS(f'Photo uploaded: {profile.photo.url}'))
        else:
            self.stdout.write(self.style.WARNING(f'Photo not found at {local_photo}'))

        # Upload CV
        local_cv = media_root / 'cv' / 'seydna_aly_cv.pdf'
        if local_cv.exists():
            with open(local_cv, 'rb') as f:
                profile.cv_file.save('cv/seydna_aly_cv.pdf', File(f), save=False)
            self.stdout.write(self.style.SUCCESS(f'CV uploaded: {profile.cv_file.url}'))
        else:
            self.stdout.write(self.style.WARNING(f'CV not found at {local_cv}'))

        profile.save()
        self.stdout.write(self.style.SUCCESS('Done.'))
