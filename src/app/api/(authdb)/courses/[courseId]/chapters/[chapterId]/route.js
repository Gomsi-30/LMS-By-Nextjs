import { NextResponse } from "next/server";
import { MuxData } from "@/models/muxdata";
import connectDB from "@/lib/db";
import Mux from '@mux/mux-node';
import Chapter from "@/models/chapters";

const mux = new Mux({
    tokenId: process.env.TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

export async function DELETE(req, { params }) {
    await connectDB();
    const id = params.chapterId;
    const userid = params.courseId; 
    try {
        const chapter = await Chapter.findOne({ _id: id });
        if (chapter.videoUrl) {
            const muxData = await MuxData.findOne({ chapterId: id });
            if (muxData) {
                await mux.video.assets.del(muxData.assetId);
                await MuxData.deleteOne({ chapterId: id });
            }
        }
        const res = await Chapter.deleteOne({ _id: id });
        if (!res.deletedCount) {
            await Course.findByIdAndUpdate(userid, { isPublished: false }, { new: true });  
        } 
        console.log(res);
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error deleting chapter:', error);
        return NextResponse.json({ error: 'Error deleting chapter' });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const id = params.chapterId;
    const values = await req.json();

    try {     
        if (values.videoUrl) {
            const existingMuxData = await MuxData.findOne({ chapterId: id });
            if (existingMuxData) {
                await mux.video.assets.del(existingMuxData.assetId);
                await MuxData.deleteOne({ chapterId: id });
            }

            const asset = await mux.video.assets.create({
                input: values.videoUrl,
                playback_policy: "public",
                test: false
            });
          
            if (!asset.id || !asset.playback_ids || asset.playback_ids.length === 0) {
                throw new Error("Asset creation failed or incomplete data received.");
            }

            const muxdata = await MuxData.create({
                assetId: asset.id,
                chapterId: id,
                playbackID: asset.playback_ids[0].id
            });

            let updatedChapter = await Chapter.findByIdAndUpdate(
                id,
                { muxdatas: muxdata._id }, 
                { new: true }
            ).populate('muxdatas'); 
            updatedChapter = await Chapter.findByIdAndUpdate(id, values, { new: true }).populate('muxdatas');
            console.log(updatedChapter);
            return NextResponse.json(updatedChapter);
        } else {
            const chapter = await Chapter.findByIdAndUpdate(id, values, { new: true }).populate('muxdatas');
            console.log(chapter);
            return NextResponse.json(chapter);
        }
    } catch (error) {
        console.error('Error updating chapter:', error);
        return NextResponse.json({ error: 'Error updating chapter' });
    }
}
