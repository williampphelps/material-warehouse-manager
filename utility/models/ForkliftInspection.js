import mongoose from 'mongoose';

const ForkliftInspectionSchema = new mongoose.Schema({
    driveTires: String,
    steerTires: String,
    horn: String,
    warningLights: String,
    driveLights: String,
    battery: String,
    seatBelt: String,
    oilLevel: String,
    transmissionLevel: String,
    coolantLevel: String,
    hydraulicLevel: String,
    fuelLevel: String,
    batteryFluidLevel: String,
    serviceBrakes: String,
    parkingBrakes: String,
    steeringMovement: String,
    hoodSeatLatches: String,
    batteryRestraint: String,
    forwardReverseControls: String,
    forks: String,
    forkLatches: String,
    sideShift: String,
    loadBackrest: String,
    loadChains: String,
    chainAttachment: String,
    hydraulicHoses: String,
});

module.exports = mongoose.models.ForkLiftInspection || mongoose.model('ForkLiftInspection', ForkLiftInspectionSchema);
