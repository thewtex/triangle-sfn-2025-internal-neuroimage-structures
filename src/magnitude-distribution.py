import itk
import numpy as np
import matplotlib.pyplot as plt
import os
from scipy.interpolate import CubicSpline

plt.rcParams['font.size'] = 18

image_files = [
    "public/ct.nii.gz",
    "public/flair.nii.gz",
    "public/mni152.nii.gz",
    "public/shear.nii.gz",
    "public/t1w.nii.gz",
    "public/tof.nii.gz",
    "public/visiblehuman.nii.gz"
]

colors = plt.cm.tab10.colors  # Using matplotlib's default color cycle
epsilon = 1/(255**2 * 8)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 7))
plt.subplots_adjust(wspace=0.3)

for idx, fname in enumerate(image_files):
    if not os.path.exists(fname):
        print(f"Skipping missing file: {fname}")
        continue

    image = itk.imread(fname, itk.F)
    grad_magnitude = itk.gradient_magnitude_image_filter(image)
    arr = itk.GetArrayViewFromImage(grad_magnitude).flatten()

    transformed = np.log2(arr**2 + epsilon) + np.log2(epsilon)

    # Raw gradient plot with cubic spline
    hist_raw, bins_raw = np.histogram(arr, bins=50, density=True)
    x_raw = (bins_raw[:-1] + bins_raw[1:])/2
    cs_raw = CubicSpline(x_raw, hist_raw)
    ax1.plot(x_raw, cs_raw(x_raw), color=colors[idx],
            label=os.path.basename(fname).split('.')[0])

    # Transformed plot with cubic spline
    hist_tfm, bins_tfm = np.histogram(transformed, bins=50, density=True)
    x_tfm = (bins_tfm[:-1] + bins_tfm[1:])/2
    cs_tfm = CubicSpline(x_tfm, hist_tfm)
    ax2.plot(x_tfm, cs_tfm(x_tfm), color=colors[idx])

ax1.set(xlabel='Gradient Magnitude', ylabel='Normalized Frequency',
       title='Raw Gradient Distributions', xlim=(0, 1000), ylim=(0, 0.2))
ax1.legend(fontsize=9, framealpha=0.9)
ax1.grid(True, alpha=0.3)

ax2.set(xlabel='Transformed Magnitude (log scale)',
       title='Normalized Distributions',
       xlim=(-40, 5), ylim=(0, 0.2))
ax2.grid(True, alpha=0.3)

plt.savefig('src/assets/gradient_comparison_150dpi.png', bbox_inches='tight', dpi=150)
plt.savefig('src/assets/gradient_comparison_300dpi.png', bbox_inches='tight', dpi=300)
plt.savefig('src/assets/gradient_comparison_600dpi.png', bbox_inches='tight', dpi=600)
plt.savefig('src/assets/gradient_comparison.svg', bbox_inches='tight', dpi=600)
plt.show()
